const express = require("express");
const app = express();
const { getAliens } = require('./controllers/aliens.controllers')
const cors = require('cors');
const { handleMongoDbErrors, handleCustomErrors, handleInternalErrors } = require('./errors/errors') 

app.use(cors());

app.use(express.json());

// app.get("/api", getEndpoints);

app.get("/api/aliens", getAliens);

// app.get("/api/aliens/names", getAliensNames);

// app.get("/api/users", getUsers);

// app.post("/api/users", postUsers);

// app.get("/api/questions", getQuestions);

app.all("*", (_, res) => res.status(404).send({ msg: "Not Found"}))

app.use(handleMongoDbErrors)

app.use(handleCustomErrors)

app.use(handleInternalErrors)

module.exports = app;
