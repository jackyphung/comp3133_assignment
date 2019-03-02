const dotenv = require('dotenv').config();
const app = require('../backend/server');
const http = require('http');

const port = process.env.PORT || 3000;
const server = http.createServer(app).listen(port, () => {
  console.log(`Server Running @ localhost:${port}`);
});

const socketio = require('../backend/socket-io.handler').subscribe(server);