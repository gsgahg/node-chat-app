var socket = io();

socket.on('connect', function() {
    console.log('connected to the server');

    socket.emit('createMessage', {
        from: 'jan',
        text: 'yolo'
    })
});

socket.on('disconnect', function() {
    console.log('disconnected from the server');
});

socket.on('newMessage', function(message) {
    console.log('new message was received: ', message);
});


