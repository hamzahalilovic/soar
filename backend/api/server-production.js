require("dotenv").config();
const express = require("express");
const multer = require("multer");
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

let user = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  profileImage: "",
};

const upload = multer({ storage: multer.memoryStorage() });

const loadJson = (filename) => {
  try {
    return require(`./data/${filename}`);
  } catch (err) {
    console.error(`Error loading ${filename}:`, err);
    return null;
  }
};

app.get("/data/:filename", (req, res) => {
  const { filename } = req.params;
  const data = loadJson(filename);
  if (!data) {
    return res.status(404).json({ error: "Data not found" });
  }
  res.json(data);
});

app.get("/user", (req, res) => res.json(user));

app.put("/user", (req, res) => {
  const updatedData = req.body;
  user = { ...user, ...updatedData };
  res.json({ message: "User updated successfully", user });
});

app.post("/user/upload", upload.single("profileImage"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const fileKey = `${Date.now()}-${req.file.originalname.replace(
    /[^a-zA-Z0-9.-]/g,
    "_"
  )}`;
  try {
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: "public-read",
    };

    await s3.send(new PutObjectCommand(uploadParams));
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${fileKey}`;
    user.profileImage = fileUrl;
    res.json({ imageUrl: fileUrl });
  } catch (err) {
    console.error("Failed to upload to S3:", err);
    res.status(500).json({ error: "Failed to upload file to S3" });
  }
});

module.exports = app;
