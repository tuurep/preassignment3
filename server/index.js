const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));

let counter = 489;

io.on('connection', socket => {
  const { id } = socket.client;
  console.log(`User connected: ${id}\nCounter is ${counter}`);
  socket.emit('init counter', { counter: counter })

  socket.on('increase counter', msg => {
    console.log(msg);

    if (counter === 500)
      // 
      counter = 0
    else counter ++

    console.log(`Server side counter is ${counter}`)
    io.emit('increase counter', { counter: counter })
  });

  socket.on('disconnect', () => console.log(`Client ${id} disconnected`));
});