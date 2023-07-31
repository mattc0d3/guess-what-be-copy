const seed = require("../db/seeds/seed");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { testAttributes } = require("../db/seeds/attributes");

beforeEach(() => {
  return seed(testAttributes);
});

// afterAll(() => {
//   return mongoose.connection.close()
// })

describe("GET /api/aliens", () => {
  test("status 200: should respond with an array of 24 randomly selected aliens ", () => {
    return request(app)
      .get("/api/aliens")
      .expect(200)
      .then(({ body }) => {
        expect(body.aliens.length).toBe(24);
        body.aliens.forEach(alien => {
          expect(alien).not.toBe(null)
        })
      });
  });
  test("returns an array of objects containing all the correct keys and value types", () => {
    return request(app)
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
          });
        });
      });
  });
  describe("error handling", () => {
    test("returns 404 status and error message when bad endpoint requested", () => {
      return request(app)
        .get("/api/alien")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not Found")
        })
    })
  })
});
