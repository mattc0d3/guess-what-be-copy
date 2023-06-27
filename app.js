const express = require("express");
const { getTopics } = require("./controllers/ncnews.controllers");
const app = express();
const { getEndpoints } = require("./controllers/ncnews.controllers");

app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.all("*", (req, res) => {
  res.status(404).send({ message: "Not found" });
});
console.log(app);

module.exports = app;
