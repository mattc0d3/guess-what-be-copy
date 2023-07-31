const seed = require("../db/seeds/seed");

const request = require("supertest");
const app = require("../app");
const { testAttributes } = require('../db/seeds/attributes')


beforeEach(() => {
  return seed(testAttributes);
});

describe('GET /api/aliens', () =>{
  test('status 200: should respond with an array of 24 randomly selected aliens ', () => {
    return request(app)
      .get('/api/aliens')
      .expect(200)
      .then(( {body} ) =>{
        console.log(body)
        expect(body.aliens.length).toBe(24)
      })
  });
})