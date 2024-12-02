const express = require("express");
const router = express.Router();
const chartData = require("../data/charts.json");

router.get("/weekly-activity", (req, res) => {
  res.json(chartData.weeklyActivity);
});

router.get("/balance-history", (req, res) => {
  res.json(chartData.balanceHistory);
});

router.get("/expense-statistics", (req, res) => {
  res.json(chartData.expenseStatistics);
});

module.exports = router;
