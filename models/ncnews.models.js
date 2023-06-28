const db = require("../db/connection");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    return rows;
  });
};

exports.selectSelectArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Not found" });
      }
      return rows[0];
    });
};

exports.selectArticles = () => {
  return Promise.all([
    db.query("SELECT * FROM articles ORDER BY created_at DESC;"),
    db.query("SELECT * FROM comments;"),
  ]).then((arrayOfTables) => {
    if (arrayOfTables[0].length === 0) {
      return Promise.reject({ status: 404, message: "Not found" });
    }
    const articles = arrayOfTables[0].rows;
    const comments = arrayOfTables[1].rows;
    articles.forEach((article) => {
      delete article.body;
      article.comment_count = 0;
    });
    articles.forEach((article) => {
      comments.forEach((comment) => {
        if (comment.article_id === article.article_id) {
          article.comment_count += 1;
        }
      });
    });

    return articles;
  });
};
