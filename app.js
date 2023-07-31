const express = require("express");
const app = express();

const cors = require('cors');

app.use(cors());

app.use(express.json());

// app.get("/api", getEndpoints);

// app.get("/api/aliens", getAliens);

// app.get("/api/aliens/:alien_id", getAliensById);


module.exports = app;
