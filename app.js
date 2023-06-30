const express = require("express");
const app = express();
const { getTopics } = require("./controllers/ncnews.controllers");
const { getEndpoints } = require("./controllers/ncnews.controllers");
const { getArticleById } = require("./controllers/ncnews.controllers");
const { getArticles } = require("./controllers/ncnews.controllers");
const { getCommentsByArticle } = require("./controllers/ncnews.controllers");
const { postComment } = require("./controllers/ncnews.controllers");
const { patchArticle } = require("./controllers/ncnews.controllers");
const { deleteComment } = require("./controllers/ncnews.controllers");

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticle);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticle);

app.delete("/api/comments/:comment_id", deleteComment);

app.all("*", (req, res) => {
  res.status(404).send({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.code) {
    if (err.code === "23503") {
      res.status(404).send({ message: "Not found" });
    }
    res.status(400).send({ message: "Bad request" });
  } else next(err);
});
app.use((err, req, res, next) => {
  if (err.message) {
    if (err.status === 400) {
      res.status(400).send({ status: 400, message: "Bad request" });
    }

    res.status(404).send({ status: 404, message: err.message });
  }
});
module.exports = app;
