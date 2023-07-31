const express = require("express");
const app = express();
const { getAliens } = require('./controllers/aliens.controllers')
const cors = require('cors');

app.use(cors());

console.log(getAliens)

app.use(express.json());

// app.get("/api", getEndpoints);

app.get("/api/aliens", getAliens);

// app.get("/api/aliens/names", getAliensNames);

// app.get("/api/users", getUsers);

// app.post("/api/users", postUsers);

// app.get("/api/questions", getQuestions);


module.exports = app;
