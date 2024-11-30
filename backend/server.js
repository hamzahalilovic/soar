const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use("/api/user", require("./routes/user"));
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/cards", require("./routes/cards"));
app.use("/api/charts", require("./routes/charts"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
