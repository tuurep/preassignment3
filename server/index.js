const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));

let counter = 0;

io.on('connection', socket => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);
  socket.emit('init counter', { counter: counter })

  socket.on('increase counter', msg => {
    console.log(`${id}: ${msg}`);

    if (counter === 500) {
      // Since counter is not visible, it can be reset
      // at 500 to avoid hitting any int max cap
      counter = 1
    }
    else counter++
    io.emit('increase counter', { counter: counter })
  });

  socket.on('disconnect', () => console.log(`Client ${id} disconnected`));
});