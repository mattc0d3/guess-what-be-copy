const { selectTopics, selectSelectArticleById } = require("../models/ncnews.models");
const endpointsData = require("../endpoints.json");


exports.getTopics = (req, res, next) => {
  selectTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
exports.getEndpoints = (req, res) => {
  res.status(200).send(endpointsData);
};
exports.getArticleById = (req, res, next) => {
  const {article_id} = req.params //id or article_id????
  selectSelectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};