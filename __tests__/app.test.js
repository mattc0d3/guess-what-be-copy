const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../app");

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
describe('all non existing endpoint', () =>{
  test("status 404: respond error message when passed a non existing route", () => {
    return request(app)
      .get("/api/banana")
      .expect(404)
      .then(({body}) => {
        expect(body.message).toBe('Not found');
      });
  });
})
