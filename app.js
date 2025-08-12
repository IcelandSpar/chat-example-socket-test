const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
  io.emit('chat message', ' Joined');
  console.log('a user connected');
  socket.on('chat message', (msg, user) => {
    socket.broadcast.emit('chat message', msg, user);
  })

  socket.on('user typing', (user) => {
    socket.broadcast.emit('user typing', user)
  })

  socket.on('disconnect', () => {
    io.emit('chat message', 'user left the chat')
  })
});



server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});