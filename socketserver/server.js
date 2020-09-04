var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('A user connected');

    socket.emit('test event', 'new connection');

    socket.on('join', function(data) {
        socket.join(data.room);
        console.log(data.user + ' joined the room: ' + data.room);
        socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:' has joined this room.'});
    });
});

server.listen(3000, () => {
    console.log('Socket.io server is listening on port 3000');
});