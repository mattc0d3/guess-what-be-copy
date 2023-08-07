const express = require("express");
const app = express();
const { getAliens } = require('./controllers/aliens.controllers')
const { getEndpoints } = require('./controllers/api.controllers')
const { getQuestions } = require('./controllers/questions.controllers')
const { getUsers, postUsers } = require('./controllers/users.controllers')
const { handlePsqlErrors, handleCustomErrors, handleInternalErrors} = require('./errors/errors')
const cors = require('cors');
const connectDB = require('./db/connectMongo')

require('dotenv').config()

connectDB()

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/aliens", getAliens);

app.get("/api/questions", getQuestions);

app.get("/api/users", getUsers);

app.post("/api/users", postUsers);

// app.get("/api/aliens/names", getAliensNames);

app.all("*", (_, res) => res.status(404).send({ msg: "Not Found"}))

app.use(handlePsqlErrors)

app.use(handleCustomErrors)

app.use(handleInternalErrors)

module.exports = app;
