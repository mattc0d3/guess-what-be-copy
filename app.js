const express = require("express");
const app = express();
const { getAliens } = require('./controllers/aliens.controllers')
const { getEndpoints } = require('./controllers/api.controllers')
const cors = require('cors');
const connectDB = require('./db/connectMongo')

require('dotenv').config()

connectDB()

app.use(cors());

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/aliens", getAliens);

// app.get("/api/aliens/names", getAliensNames);

// app.get("/api/users", getUsers);

// app.post("/api/users", postUsers);

// app.get("/api/questions", getQuestions);

app.all("*", (_, res) => res.status(404).send({ msg: "Not Found"}))

const PORT = process.env.PORT

app.listen(PORT, () =>{
    console.log('Server is running on PORT' + PORT)    
})

module.exports = app;
