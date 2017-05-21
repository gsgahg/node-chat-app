const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
    console.log('new user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app.',
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        created_at: new Date().getTime()
    });

    socket.on('disconnect', function() {
        console.log('client has disconnected');
    });

    socket.on('createMessage', function(message) {
        console.log('createMessage', message);

        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     created_at: new Date().getTime()
        // });
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            created_at: new Date().getTime()
        });

    });
});

server.listen(port, function() {
    console.log(`Server is up on port ${port}`);
});