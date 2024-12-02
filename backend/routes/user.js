const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const userFilePath = path.join(__dirname, "../data/user.json");

router.get("/", (req, res) => {
  try {
    const userData = JSON.parse(fs.readFileSync(userFilePath, "utf8"));
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

router.put("/", (req, res) => {
  try {
    const updatedData = req.body;
    const userData = JSON.parse(fs.readFileSync(userFilePath, "utf8"));

    const newUser = { ...userData, ...updatedData };

    fs.writeFileSync(userFilePath, JSON.stringify(newUser, null, 2));
    res.json({ message: "User updated successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user data" });
  }
});

module.exports = router;
