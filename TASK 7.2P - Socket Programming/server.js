const http = require('http').createServer(app); 
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000);
});

http.listen(3000, () => console.log("Server running on port 3000"));
