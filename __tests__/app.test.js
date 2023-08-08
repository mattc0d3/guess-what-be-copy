const seed = require("../db/seeds/seed");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const { testAttributes } = require("../db/seeds/data/attributes");
const { questions } = require("../db/seeds/data/questions");
const { testUsers } = require("../db/seeds/data/testUsers");

beforeEach(async () => {
  await seed(testAttributes, questions, testUsers);
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
  test("status 200: should respond with an array of all possible questions", async () => {
    await request(app)
      .get("/api/questions")
      .expect(200)
      .then(({ body }) => {
        expect(body.questions).toBeInstanceOf(Array);
        expect(body.questions.length > 0).toBe(true);
        body.questions.forEach((question) => {
          expect(question).toMatchObject({
            alienProp: expect.any(String),
            question: expect.any(String),
          });
          expect(question.hasOwnProperty("checkFor")).toBe(true);
        });
      });
  });
});

describe("Users", () => {
  describe("GET /api/users", () => {
    test("status 200: should respond with an array of all users, sorted by score in ascending order and limited to 10 items per page by default", async () => {
      await request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toBeInstanceOf(Array);
          expect(body.users).toBeSortedBy("score");
          expect(body.users.length > 0).toBe(true);
          expect(body.users.length <= 10).toBe(true);
          body.users.forEach((user) => {
            expect(user).toMatchObject({
              username: expect.any(String),
              score: expect.any(Number),
              time: expect.any(Object),
              created_at: expect.any(String),
            });
          });
        });
    });
    test("response object contains totalUsers property containing count of all results", async () => {
      await request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.hasOwnProperty("totalResults")).toBe(true)
          expect(typeof body.totalResults).toBe("number")
        });
    });
    test("sorts response by time in ascending order when time specified as sort_by query", async () => {
      await request(app)
        .get("/api/users?sort_by=time")
        .expect(200)
        .then(({ body }) => {
          expect(body.users.length > 0).toBe(true);
          let minutesComparison = 0;
          body.users.forEach((user) => {
            expect(user.time.minutes >= minutesComparison).toBe(true);
            minutesComparison = user.time.minutes;
          });
        });
    });
    test("response restricts results by time period query", async () => {
      await request(app)
        .get("/api/users?period=month")
        .expect(200)
        .then(({ body }) => {
          expect(body.users.length > 0).toBe(true);
          const today = new Date();
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

          body.users.forEach((user) => {
            const userDate = new Date(user.created_at);
            expect(userDate >= oneMonthAgo && userDate <= today).toBe(true);
          });
        });
    });
    test("response paginates by page query", async () => {
      await request(app)
        .get("/api/users?page=2")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toBeInstanceOf(Array);
          expect(body.users).toBeSortedBy("score");
          expect(body.users.length <= 10).toBe(true);
        });
    });
    test("endpoint can handle multiple queries simultaneously", async () => {
      await request(app)
        .get("/api/users?sort_by=time&period=week&page=1")
        .expect(200)
        .then(({ body }) => {
          expect(body.users.length > 0).toBe(true);
          let minutesComparison = 0;
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          body.users.forEach((user) => {
            expect(user.time.minutes >= minutesComparison).toBe(true);
            minutesComparison = user.time.minutes;
            const userDate = new Date(user.created_at);
            expect(userDate >= oneWeekAgo).toBe(true);
          });
        });
    });
    test("returns 400 error when invalid queries requested", async () => {
      await request(app)
        .get("/api/users?sort_by=bananas")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
  });
  describe("POST /api/users", () => {
    test("status 201: responds with a user object formatted to contain the posted info", async () => {
      await request(app)
        .post("/api/users")
        .send({
          username: "test user",
          score: 7,
          minutes: 2,
          seconds: 15,
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.user).toMatchObject({
            username: "test user",
            score: 7,
            time: expect.any(Object),
            created_at: expect.any(String),
          });
        });
    });
    test("status 201: ignores unnecessary properties on request body", async () => {
      await request(app)
        .post("/api/users")
        .send({
          username: "test user",
          score: 7,
          minutes: 2,
          seconds: 15,
          extra: "extra data",
        })
        .expect(201);
    });
    test("response converts input to correct data format and responds when wrong types submitted", async () => {
      await request(app)
        .post("/api/users")
        .send({
          username: false,
          score: "7",
          minutes: true,
          seconds: 15,
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.user).toMatchObject({
            username: "false",
            score: 7,
            time: {
              seconds: 15,
              minutes: 1,
            },
            created_at: expect.any(String),
          });
        });
    });
    test("status 400: returns error message when post info is incomplete", async () => {
      await request(app)
        .post("/api/users")
        .send({
          username: "test user",
          score: 7,
          minutes: 2,
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
  });
});
