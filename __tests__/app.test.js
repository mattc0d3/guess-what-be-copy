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
        const created_atArray = body.articles.map((article) =>{
          return article.created_at
        })
        expect(created_atArray).toBeSorted({ descending: true });
      });
  });
 });
