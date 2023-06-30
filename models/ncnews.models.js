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
    db.query(
      "SELECT author, title, article_id, topic, created_at, votes, article_img_url FROM articles ORDER BY created_at DESC;"
    ),
    db.query("SELECT * FROM comments;"),
  ]).then((arrayOfTables) => {
    const articles = arrayOfTables[0].rows;
    const comments = arrayOfTables[1].rows;
    articles.forEach((article) => {
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
exports.selectCommentsByArticle = (article_id) => {
  return db
    .query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};
exports.checkArticleExists = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, message: "Not found" });
      }
    });
};
exports.insertComment = (newComment, article_id) => {
  if (!newComment.username || !newComment.body) {
    return Promise.reject({
      status: 400,
      message: "Bad request, missing fields",
    });
  }
  return db
    .query(
      `INSERT INTO comments (
    body, article_id, author
  ) VALUES($1, $2, $3) RETURNING *;`,
      [newComment.body, article_id.article_id, newComment.username]
    )
    .then((insertedComment) => {
      return insertedComment.rows[0];
    });
};
exports.updateArticle = (votesInc, article_id) => {
  if (typeof votesInc.inc_votes.inc_votes !== "number") {
    return Promise.reject({ status: 400, message: "Bad request" });
  }
  return db
    .query(
      `UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *`,
      [article_id.article_id, votesInc.inc_votes.inc_votes]
    )
    .then((updatedArticle) => {
      if (!updatedArticle.rows.length) {
        return Promise.reject({ status: 404, message: "Not found" });
      }

      return updatedArticle.rows[0];
    });
};
