require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const app = express();

app.use(cors());
app.use(express.json());

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, `${Date.now()}-${sanitizedFilename}`);
  },
});
const upload = multer({ storage });

let user = JSON.parse(fs.readFileSync("./data/user.json", "utf8"));

app.get("/user", (req, res) => res.json(user));

app.put("/user", (req, res) => {
  const updatedData = req.body;
  const updatedUser = { ...user, ...updatedData };
  fs.writeFileSync("./data/user.json", JSON.stringify(updatedUser, null, 2));
  user = updatedUser;
  res.json({ message: "User updated successfully", user: updatedUser });
});

app.post("/user/upload", upload.single("profileImage"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const sanitizedFilename = req.file.originalname.replace(
    /[^a-zA-Z0-9.-]/g,
    "_"
  );
  const fileKey = `${Date.now()}-${sanitizedFilename}`;

  try {
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: fs.createReadStream(req.file.path),
      ContentType: req.file.mimetype,
      ACL: "public-read",
    };

    await s3.send(new PutObjectCommand(uploadParams));
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${fileKey}`;

    user.profileImage = fileUrl;
    fs.writeFileSync("./data/user.json", JSON.stringify(user, null, 2));

    res.json({ imageUrl: fileUrl });
  } catch (err) {
    console.error("Failed to upload to S3:", err);
    res.status(500).json({ error: "Failed to upload file to cloud storage" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
