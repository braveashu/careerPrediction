// server.js
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const path = require("path");
const Score = require("./models/Score");

mongoose.connect("mongodb://0.0.0.0:27017/quiz-score1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());

app.get("/quiz.html", (req, res) => {
  res.sendFile(path.join(__dirname, "main/index.html"));
});
app.get("/work.html", (req, res) => {
  res.sendFile(path.join(__dirname, "main/work.html"));
});

app.use(express.static("public"));

app.post("/submit-quiz", async (req, res) => {
  console.log(req.body);
  const { username, score } = req.body;

  const newScore = new Score({ username, score });
  await newScore.save();
  res.json({ username, score });
 // res.redirect('/work.html')
});

//WORK_______________________________
app.post("/submit-work-quiz", async (req, res) => {
  console.log(req.body);
  const { username, score2 } = req.body;
  const newScore = new Score({ quizType: "another", username, score2 });
  await newScore.save();
  res.json({ username, score2 });
});


const port = process.env.PORT || 30008;
app.listen(port, () => {
  console.log(
    `Server is running on port http://localhost:${port}/quiz.html`
  );
});