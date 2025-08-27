var express = require("express");
var cors = require("cors");
var app = express();
app.use(express.json());

app.use(cors());
const port = 3100;

let transactions = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/get-tx", (req, res) => {
  console.log(transactions);
  res.send(JSON.stringify(transactions));
});

app.post("/create-tx", (req, res) => {
  const tx = req.body;
  console.log(tx);
  transactions.push(tx);
  res.send("Success");
});
