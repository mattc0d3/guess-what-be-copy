const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app");
const endpointsData = require("../endpoints.json");

beforeEach(() => {
  return seed(testData);
});

describe("GET /api/topics", () => {
  test("status 200: should respond with an array of topic objects  ", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toBeInstanceOf(Array);
        expect(body.topics.length).toBe(3);
        body.topics.forEach((topic) => {
          expect(topic).toHaveProperty("description", expect.any(String));
          expect(topic).toHaveProperty("slug", expect.any(String));
        });
      });
  });
});
describe("GET /api", () => {
  test("status 200: should respond with a json object describing all the endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual(endpointsData);
      });
  });
});
describe("all non existing endpoint", () => {
  test("status 404: respond error message when passed a non existing route", () => {
    return request(app)
      .get("/api/banana")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });
});
describe("GET /api/articles/:article_id", () => {
  test("status 200: responds with the queried article", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.article.article_id).toBe(1);
        expect(body.article).toHaveProperty("title", expect.any(String));
        expect(body.article).toHaveProperty("topic", expect.any(String));
        expect(body.article).toHaveProperty("author", expect.any(String));
        expect(body.article).toHaveProperty("body", expect.any(String));
        expect(body.article).toHaveProperty("created_at", expect.any(String));
        expect(body.article).toHaveProperty("votes", expect.any(Number));
        expect(body.article).toHaveProperty(
          "article_img_url",
          expect.any(String)
        );
      });
  });
  test("status 400: responds with an error message when an invalid parameter is used", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
  test("(status 404: responds with an error message when the parameter is valid but does not exist)", () => {
    return request(app)
      .get("/api/articles/99999")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });
});
describe("GET /api/articles", () => {
  test("status 200: should respond with an array of article objects  ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeInstanceOf(Array);
        expect(body.articles.length).toBe(13);
        body.articles.forEach((article) => {
          expect(article).toHaveProperty("author", expect.any(String));
          expect(article).toHaveProperty("title", expect.any(String));
          expect(article).toHaveProperty("article_id", expect.any(Number));
          expect(article).toHaveProperty("topic", expect.any(String));
          expect(article).toHaveProperty("created_at", expect.any(String));
          expect(article).toHaveProperty("votes", expect.any(Number));
          expect(article).toHaveProperty("article_img_url", expect.any(String));
          expect(article).toHaveProperty("comment_count", expect.any(Number));
          expect(article.body).toBe(undefined);
        });
        expect(body.articles[0].comment_count).toBe(2); //article 3 has 2 comments
        expect(body.articles[6].comment_count).toBe(11); //article 1 has 11 comments

        const created_atArray = body.articles.map((article) => {
          return article.created_at;
        });

        expect(created_atArray).toBeSorted({ descending: true });
      });
  });
});
describe("GET /api/articles/:article_id/comments", () => {
  test("200: responds with an array of comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeInstanceOf(Array);
        expect(body.comments.length).toBe(11);
        expect(body.comments).toBeSorted({ descending: true });
        body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("article_id");
          expect(comment.article_id).toBe(1);
        });
      });
  });
  test("200: responds with an empty array if the article_id exists but it has no comments", () => {
    return request(app)
      .get("/api/articles/2/comments") //article 2 has no comments
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
  test("status 400: responds with an error message when an invalid article_id is passed", () => {
    return request(app)
      .get("/api/articles/banana/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
  test("404: responds with an error message when the article_id passed as parameter does not exist ", () => {
    return request(app)
      .get("/api/articles/999999/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });
});
describe("POST /api/articles/:article_id/comments", () => {
  test("201: add a comment for an article and responds with the posted comment", () => {
    const newComment = {
      username: "lurker",
      body: "I like this article",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .expect(201)
      .send(newComment)
      .then(({ body }) => {
        expect(body).toHaveProperty("comment_id", expect.any(Number));
        expect(body).toHaveProperty("votes", expect.any(Number));
        expect(body).toHaveProperty("created_at", expect.any(String));
        expect(body).toHaveProperty("author", expect.any(String));
        expect(body).toHaveProperty("body", expect.any(String));
        expect(body.article_id).toBe(1);
      });
  });
  test("201: ignores additional input, adds the new comment and responds with the posted comment", () => {
    const newComment = {
      username: "lurker",
      body: "I like this article",
      age: "Ignore my age",
      Height: "Ignore my height",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .expect(201)
      .send(newComment)
      .then(({ body }) => {
        expect(body).toHaveProperty("comment_id", expect.any(Number));
        expect(body).toHaveProperty("votes", expect.any(Number));
        expect(body).toHaveProperty("created_at", expect.any(String));
        expect(body).toHaveProperty("author", expect.any(String));
        expect(body).toHaveProperty("body", expect.any(String));
        expect(body.article_id).toBe(1);
      });
  });
  test("400: responds with an error message when the request has missing required fields", () => {
    const newComment = {
      body: "I like this article",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .expect(400)
      .send(newComment)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
  test("404: responds with an error message when the provided article_id does not exist", () => {
    const newComment = {
      username: "lurker",
      body: "I like this article",
    };
    return request(app)
      .post("/api/articles/9999/comments")
      .expect(404)
      .send(newComment)
      .then(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });
  test("404: responds with an error message when the provided username does not exist", () => {
    const newComment = {
      username: "pablo",
      body: "I like this article",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .expect(404)
      .send(newComment)
      .then(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });
  test("status 400: responds with an error message when an invalid type article_id is used", () => {
    const newComment = {
      username: "lurker",
      body: "I like this article",
    };
    return request(app)
      .post("/api/articles/notanumber/comments")
      .expect(400)
      .send(newComment)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
});
describe("PATCH /api/articles/1", () => {
  test("200: responds wIth the updated object ", () => {
    const inc_votes = {
      inc_votes: 10,
    };
    return request(app)
      .patch("/api/articles/1")
      .expect(200)
      .send({ inc_votes })
      .then(({ body }) => {
        expect(body.article_id).toBe(1);
        expect(body).toHaveProperty("topic", expect.any(String));
        expect(body).toHaveProperty("author", expect.any(String));
        expect(body).toHaveProperty("body", expect.any(String));
        expect(body).toHaveProperty("created_at", expect.any(String));
        expect(body).toHaveProperty("article_img_url", expect.any(String));
        expect(body.votes).toBe(
          testData.articleData[0].votes + inc_votes.inc_votes
        );
      });
  });
  test("400: responds with an error message when an invalid type of input is passed", () => {
    const inc_votes = {
      inc_votes: "ten",
    };
    return request(app)
      .patch("/api/articles/1")
      .expect(400)
      .send(inc_votes)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
  test("400: responds with error message when passed an invalid article ", () => {
    const inc_votes = {
      inc_votes: 10,
    };
    return request(app)
      .patch("/api/articles/notanumber")
      .expect(400)
      .send(inc_votes)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
});
test("404: responds with an error message when the provided article_id does not exist", () => {
  const inc_votes = {
    inc_votes: 10,
  };
  return request(app)
    .post("/api/articles/9999")
    .expect(404)
    .send(inc_votes)
    .then(({ body }) => {
      expect(body.message).toBe("Not found");
    });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: responds with status 204 and no content", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  test('"404: responds with an error message when the provided comment does not exist" ', () => {
    return request(app)
      .delete("/api/comments/99999")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });
  test("400: responds with error message when passed an invalid comment type ", () => {
    return request(app)
      .delete("/api/comments/notanumber")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
});
describe("GET /api/users", () => {
  test("status 200: should respond with an array of users objects  ", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body.users).toBeInstanceOf(Array);
        expect(body.users.length).toBe(4);
        body.users.forEach((users) => {
          expect(users).toHaveProperty("name", expect.any(String));
          expect(users).toHaveProperty("username", expect.any(String));
          expect(users).toHaveProperty("avatar_url", expect.any(String));
        });
      });
  });
});
