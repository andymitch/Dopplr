const mongoose = require('mongoose');
const dotenv = require('dotenv');
const socket = require('socket.io');
const cors = require('cors');
const express = require('express');
const app = express();


//Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const messageRoute = require('./routes/messages');
const friendRoute = require('./routes/friend');
const feedRoute = require('./routes/feed')
const searchRoute = require('./routes/search')
const userInfoRoute = require('./routes/user_info')
const profileRoute = require('./routes/profile')
const notificationsRoute = require('./routes/notifications')

//access environmentals in .env
dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log('connected to DB!'))
.catch(err => console.log('server not connected to database: ' + err))

//Middleware
app.use(express.json());
app.use(cors('http://localhost:3001'));
//Route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/messages', messageRoute);
app.use('/api/friend', friendRoute);
app.use('/api/feed', feedRoute);
app.use('/api/search', searchRoute);
app.use('/api/user_info', userInfoRoute);
app.use('/api/profile', profileRoute);
app.use('/api/notifications', notificationsRoute);

//start server
const server = app.listen(3000, () => console.log('server running on port: 3000'));

//socket setup
const io = socket(server);

//socket connetcion
io.on('connection',(socket) => {
  console.log('socket connection id:',socket.id);

  socket.on('username', (handle) => {
    // we store the username in the socket session for this client
    socket.username = handle;
  });

  //handle chat event
  socket.on('chat',(data) => {
    io.sockets.emit('chat', data);
  });

  //handle typing event
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('disconnect', () => {
    console.log(socket.username + " Disconnected from Socket " + socket.id);
    io.sockets.emit('left', socket.username);
  });
});