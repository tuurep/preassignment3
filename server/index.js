const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));

var counter = 0;

io.on('connection', socket => {
  const { id } = socket.client;
  console.log(`User connected: ${id}\nCounter is ${counter}`);
  socket.emit('init counter', { counter: counter })

  socket.on('click counter', msg => {
    console.log(msg);
    counter++
    console.log(`Server side counter is ${counter}`)
    io.emit('click counter', { counter: counter })
  });

  socket.on('disconnect', () => console.log(`Client ${id} disconnected`));
});