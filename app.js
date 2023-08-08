const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { getAliens } = require('./controllers/aliens.controllers');
const { getEndpoints } = require('./controllers/api.controllers');
const { getQuestions } = require('./controllers/questions.controllers');
const { getUsers, postUsers } = require('./controllers/users.controllers');
const {
  handleMongoErrors,
  handleCustomErrors,
  handleInternalErrors,
} = require('./errors/errors');
const cors = require('cors');
const connectDB = require('./db/connectMongo');

const port = process.env.PORT || 8080;

const io = require('socket.io')(server, { cors: { origin: '*' } });

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

let arr = [];
let playingArray = [];

io.on('connection', (socket) => {
  console.log(socket.id, '<--socket id');
  socket.on('find', (e) => {
    socket.emit('your-socketid', socket.id);
    if (e.name !== null) {
      arr.push({ name: e.name, socket_id: socket.id });

      if (arr.length >= 2) {
        let p1obj = {
          p1name: arr[0].name,
          p1socketId: arr[0].socket_id,
        };
        let p2obj = {
          p2name: arr[1].name,
          p2socketId: arr[1].socket_id,
        };

        let obj = {
          p1: p1obj,
          p2: p2obj,
        };
        playingArray.push(obj);

        arr.splice(0, 2);

        io.emit('find', { allPlayers: playingArray });

        playingArray.splice(0, 1);
      }
    }
  });
  socket.on('start-game', () => {
    io.emit('proceed');
  });
});

require('dotenv').config();

connectDB();

app.use(cors());

app.use(express.json());

app.get('/api', getEndpoints);

app.get('/api/aliens', getAliens);

app.get('/api/questions', getQuestions);

app.get('/api/users', getUsers);

app.post('/api/users', postUsers);

// app.get("/api/aliens/names", getAliensNames);

app.all('*', (_, res) => res.status(404).send({ msg: 'Not Found' }));

app.use(handleMongoErrors);

app.use(handleCustomErrors);

app.use(handleInternalErrors);

module.exports = app;
