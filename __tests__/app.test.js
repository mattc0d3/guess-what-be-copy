const seed = require("../db/seeds/seed");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { testAttributes } = require("../db/seeds/data/attributes");

beforeEach(async () => {
  await seed(testAttributes);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /api", () => {
  test("responds with JSON object containing endpoints key", async () => {
    await request(app)
      .get("/api")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then(({ body }) => {
        expect(body.hasOwnProperty("endpoints")).toBe(true);
      });
  });
  test("endpoints object contains keys of endpoints and object values that describe attributes", async () => {
    await request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(
          Object.keys(body.endpoints).forEach((key) => expect.any(String))
        );
        expect(
          Object.values(body.endpoints).forEach((value) => {
            if (value !== body.endpoints["GET /api"]) {
              expect(value).toMatchObject({
                description: expect.any(String),
                queries: expect.any(Array),
                exampleResponse: expect.any(Object),
              });
            }
          })
        );
      });
  });
});

describe("GET /api/aliens", () => {
  test("status 200: should respond with an array of 24 randomly selected aliens ", async () => {
    await request(app)
      .get("/api/aliens")
      .expect(200)
      .then(({ body }) => {
        expect(body.aliens.length).toBe(24);
        body.aliens.forEach((alien) => {
          expect(alien).not.toBe(null);
        });
      });
  });
  test("returns an array of objects containing all the correct keys and value types", async () => {
    await request(app)
      .get("/api/aliens")
      .expect(200)
      .then(({ body }) => {
        expect(body.aliens).toBeInstanceOf(Array);
        expect(body.aliens.length > 0).toBe(true);
        body.aliens.forEach((alien) => {
          expect(alien).toMatchObject({
            skinColour: expect.any(String),
            skinTexture: expect.any(String),
            eyes: expect.any(Number),
            horns: expect.any(Number),
            eyeColour: expect.any(String),
            isFriendly: expect.any(Boolean),
            hasAntenna: expect.any(Boolean),
            planet: expect.any(String),
            isActive: expect.any(Boolean),
          });
        });
      });
  });
  describe("error handling", () => {
    test("returns 404 status and error message when bad endpoint requested", async () => {
      await request(app)
        .get("/api/alien")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found");
        });
    });
  });
});

describe("GET /api/questions", () => {
  test.only("status 200: should respond with an array of all possible questions", async () => {
    await request(app)
      .get("/api/questions")
      .expect(200)
      .then(({ body }) => {
        expect(body.questions).toBeInstanceOf(Array);
        expect(body.questions.length > 0).toBe(true);
      });
  });
});
