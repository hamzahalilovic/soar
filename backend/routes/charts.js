const express = require("express");
const router = express.Router();
const chartData = require("../data/charts.json");

router.get("/weekly-activity", (req, res) => {
  res.json(chartData.weeklyActivity);
});

router.get("/balance-history", (req, res) => {
  res.json(chartData.balanceHistory);
});

module.exports = router;
