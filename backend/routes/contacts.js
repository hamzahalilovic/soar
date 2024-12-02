const express = require("express");
const router = express.Router();
const cardData = require("../data/cards.json");

router.get("/", (req, res) => {
  res.json(cardData);
});

module.exports = router;
