const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const cards = require("./data/cards.json");
const transactions = require("./data/transactions.json");
const charts = require("./data/charts.json");
const contacts = require("./data/contacts.json");

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

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
