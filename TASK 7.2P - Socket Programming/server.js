// Import dependencies
const express = require('express');
const app = express();               // Create Express app
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files (index.html, scripts.js)
app.use(express.static(__dirname));

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Send random number every second
  setInterval(() => {
    socket.emit('number', parseInt(Math.random() * 10));
  }, 1000);
});

// Start the server
http.listen(3000, () => console.log('Server running on port 3000'));
