// server.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const ScoreW = require("./ScoreW");

mongoose.connect("mongodb://0.0.0.0:27017/quiz-score1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());

app.get("/quiz.html", (req, res) => {
  res.sendFile(path.join(__dirname, "main/work.html"));
});

app.use(express.static("public"));

app.post("/submit-quiz", async (req, res) => {
  console.log(req.body);
  const { username, scoreW } = req.body;

  const newScore = new ScoreW({ username, score });
  await newScore.save();

  res.json({ username, scoreW });
  // res.redirect('/work.html')
});

const port = process.env.PORT || 30008;
app.listen(port, () => {
  console.log(
    `Server is running on port http://localhost:${port}/quiz.html`
  );
});