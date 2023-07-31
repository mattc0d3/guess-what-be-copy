const express = require("express");
const app = express();
require('dotenv').config()
const { getAliens } = require('./controllers/aliens.controllers')
const cors = require('cors');
const { handleMongoDbErrors, handleCustomErrors, handleInternalErrors } = require('./errors/errors') 
const connectDB = require('./db/connectMongo')
connectDB()
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

const PORT = process.env.PORT

app.listen(PORT, () =>{
    console.log('Server is running on PORT' + PORT)
    
})

module.exports = app;
