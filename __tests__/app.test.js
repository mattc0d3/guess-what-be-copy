const seed = require("../db/seeds/seed");
const testData = require("../db/data/aliensData");
const request = require("supertest");
const app = require("../app");


beforeEach(() => {
  return seed(testData);
});

