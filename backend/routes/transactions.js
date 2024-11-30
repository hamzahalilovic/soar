const express = require("express");
const router = express.Router();
const transactionData = require("../data/transactions.json");

router.get("/", (req, res) => {
  res.json(transactionData);
});

module.exports = router;
