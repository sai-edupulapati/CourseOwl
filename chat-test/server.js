const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { MongoClient } = require('mongodb');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

// MongoDB setup mongodb://username:password@localhost:27017
const MONGO_URI = 'mongodb://courseowl241:kmwouENhxx3iJPUi@localhost:27017';
const DB_NAME = 'chatapp';
let db;

MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to MongoDB');
    db = client.db(DB_NAME);
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New user connected');

  // Handle new chat message
  socket.on('chatMessage', (data) => {
    const { username, message } = data;
    const chatMessage = { username, message, timestamp: new Date() };
    db.collection('messages').insertOne(chatMessage);
    io.emit('message', chatMessage);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
