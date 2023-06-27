const express = require("express");
const { getTopics } = require("./controllers/ncnews.controllers");
const app = express();
const { getEndpoints } = require("./controllers/ncnews.controllers");
const { getArticleById } = require("./controllers/ncnews.controllers");


app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.all("*", (req, res) => {
  res.status(404).send({ message: "Not found" });
});

app.use((err, req, res, next) =>{
  res.status(400).send({message: 'Bad request'})
})


module.exports = app;
