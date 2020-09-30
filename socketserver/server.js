const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

// Parse Requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access0Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const products = require('./dbOperations/operations');
app.post('/products', products.insert);
app.get('/productFind', products.find);
app.post('/productUpdate', products.update);
app.post('/productDelete', products.delete);

io.on('connection', function(socket) {
    console.log('A user connected');

    socket.emit('test event', 'new connection');

    //New user joining a room
    socket.on('join', function(data) {
        socket.join(data.room);
        console.log(data.user + ' joined the room: ' + data.room);
        socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:' has joined this room.'});
    });

    //Existing user leaving a room
    socket.on('leave', function(data) {
        console.log(data.user + ' left the room: ' + data.room);
        socket.broadcast.to(data.room).emit('left room', {user:data.user, message:' has left this room.'});
        socket.leave(data.room);
    });
});

server.listen(3000, () => {
    console.log('Socket.io server is listening on port 3000');
});