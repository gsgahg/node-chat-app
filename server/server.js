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

    socket.on('disconnect', function() {
        console.log('client has disconnected');
    })
});

server.listen(port, function() {
    console.log(`Server is up on port ${port}`);
});