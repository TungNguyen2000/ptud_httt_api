
$(function () {
    const socket = io();
    const socketIdSpan = document.getElementById("socketId");
    const usernameSpan = document.getElementById("username");

    socket.on('connect', () => {
      socketIdSpan.innerText = socket.id;

      socket.emit('whoami', (username) => {
        usernameSpan.innerText = username;
      });
    });

});
