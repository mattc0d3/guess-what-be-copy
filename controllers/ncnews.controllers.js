const {
  selectTopics,
  selectSelectArticleById,
  selectArticles,
  selectCommentsByArticle,
} = require("../models/ncnews.models");
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
  const { article_id } = req.params;
  selectSelectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArticle(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
