const express = require("express");
const router = express.Router();
const userData = require("../data/user.json");

router.get("/", (req, res) => {
  res.json(userData);
});

module.exports = router;
