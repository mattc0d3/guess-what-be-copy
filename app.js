const express = require("express");
const { getTopics } = require("./controllers/ncnews.controllers");
const app = express();
const { getEndpoints } = require("./controllers/ncnews.controllers");
const { getArticleById } = require("./controllers/ncnews.controllers");
const { getArticles } = require("./controllers/ncnews.controllers");

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.all("*", (req, res) => {
  res.status(404).send({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.code) {
    res.status(400).send({ message: "Bad request" });
  } else next(err);
});
app.use((err, req, res, next) => {
  if (err.message) {
    res.status(404).send({ status: 404, message: err.message });
  }
});

module.exports = app;
