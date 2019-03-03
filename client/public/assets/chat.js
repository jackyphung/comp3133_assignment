$(function () {
    var socket = io.connect('http://localhost:3000')

    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_username = $("#send_username");
    var chatroom = $("#chatroom");
    var feedback = document.querySelector("#feedback");

    send_message.click(function () {
        socket.emit('new_message', { message: message.val() });
    })

    socket.on("new_message", (data) => {
        console.log(data)
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
    })
    send_username.click(function () {
        console.log(username.val())
        socket.emit('change_username', { username: username.val() });
    });

    // Emit typing
    message.bind("keypress", () => {
        socket.emit('typing');
    });

    // Listen on typing
    socket.on('typing', (data) => {
        feedback.innerHTML = "<p><i>" + data.username + " is typing a message..." + "</i></p>";
    });
});