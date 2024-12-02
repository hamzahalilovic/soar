const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const cards = require("./data/cards.json");
const transactions = require("./data/transactions.json");
const charts = require("./data/charts.json");
const contacts = require("./data/contacts.json");
const user = require("./data/user.json");

const UPLOADS_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}
app.use("/uploads", express.static(UPLOADS_DIR));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
    cb(null, `${Date.now()}-${sanitizedFilename}`);
  },
});
const upload = multer({ storage });

// Routes
app.get("/cards", (req, res) => {
  res.json(cards);
});

app.get("/transactions", (req, res) => {
  res.json(transactions);
});

app.get("/charts", (req, res) => {
  res.json(charts);
});

app.get("/contacts", (req, res) => {
  res.json(contacts);
});

app.get("/user", (req, res) => {
  res.json(user);
});

app.put("/user", (req, res) => {
  const updatedData = req.body;

  if (!Object.keys(updatedData).length) {
    return res.status(400).json({ error: "No data provided" });
  }

  const updatedUser = { ...user, ...updatedData };

  try {
    fs.writeFileSync("./data/user.json", JSON.stringify(updatedUser, null, 2));
    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Failed to update user:", err);
    res.status(500).json({ error: "Failed to update user data" });
  }
});

app.post("/user/upload", upload.single("profileImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  user.profileImage = `/uploads/${req.file.filename}`;

  fs.writeFileSync("./data/user.json", JSON.stringify(user, null, 2));
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
