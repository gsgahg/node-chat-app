var socket = io();

function scrollToBottom() {
    var messages = jQuery('#messages');
    var scrollHeight = messages.prop('scrollHeight');

    messages.scrollTop(scrollHeight);
}

socket.on('connect', function() {
    console.log('connected to the server');
});

socket.on('disconnect', function() {
    console.log('disconnected from the server');
});

socket.on('newMessage', function(message) {
    console.log('new message was received: ', message);

    var li = jQuery('<li></li>');
    li.text(message.from + ': ' + message.text);

    jQuery('#messages').append(li);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    if (jQuery('[name=message]').val() != '') {
        socket.emit('createMessage', {
            from: 'anon',
            text: jQuery('[name=message]').val()
        }, function() {
            jQuery('[name=message]').val('');
        })
    }
});


