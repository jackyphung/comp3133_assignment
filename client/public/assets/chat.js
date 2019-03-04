$(function () {
    var socket = io.connect('http://localhost:3000')

    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_username = $("#send_username");
    var chatroom = $("#chatroom");
    var chatroom2 = $("#chatroom2")
    var typing_feedback = $("#typing-feedback");
    var connect_feedback = $('#connect-feedback');
    var join_room = $("#join_room");
    var leave_room = $("#leave_room")
    var typingTimeout;
    var connectTimeout;
    var disconnectTimeout;

    function timeoutTyping() {
        socket.emit("typing", { typing: false });
    }
    
    function timeoutConnect() {
        $(".connect").remove();
    }

    function timeoutDisconnect() {
        $(".disconnect").remove();
        
    }

    send_message.click(function () {
        socket.emit('new_message', { message: message.val() });
    })

    socket.on("new_message", (data) => {
        console.log(data)
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
    });

    send_username.click(function () {
        console.log(username.val())
        socket.emit('change_username', { username: username.val() });
    });

    // Emit typing
    message.bind("keypress", () => {
        socket.emit('typing', { typing: true });
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(timeoutTyping, 2000);
    });

    // Listen on typing
    socket.on('typing', (data) => {
        if (data.typing)
            typing_feedback.html("<p><em><strong>" + data.username + "</strong> is typing a message..." + "</em></p>");
        else
            typing_feedback.html("");
    });

    socket.on('new_connection', (data) => {
        console.log(data)
        if (connect_feedback.find(".connect").length)
            $(".connect").html("<strong>" + data.username + "</strong>" + data.message);
        else
            connect_feedback.append("<p class='connect'><strong>" + data.username + "</strong>" + data.message + "</p>" );

        clearTimeout(connectTimeout);
        connectTimeout = setTimeout(timeoutConnect, 2000);
    });

    socket.on('disconnect_message', (data) => {
        if (connect_feedback.find("p.disconnect").length)
            $(".disconnect").html("<strong>" + data.username + "</strong>" + data.message);
        else
            connect_feedback.append("<p class='disconnect'><strong>" + data.username + "</strong>" + data.message + "</p>");

        clearTimeout(disconnectTimeout);
        disconnectTimeout = setTimeout(timeoutDisconnect, 2000);
    });

    join_room.click(function(){
        socket.emit('join_room', 'room1');
    })

    socket.on('join_message', (data) => {
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
        console.log(data)
    })

    leave_room.click(function(){
        socket.emit('leave_room', 'room1')
    })

    socket.on('leave_message', (data) => {
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
        console.log(data)
    })
});