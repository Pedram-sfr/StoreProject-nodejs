const socketIO = require("socket.io");
function initialSocket(htrpServer) {
    const io = socketIO(htrpServer,{
        cors:{
            origin: "*"
        }
    });
    return io;
}

module.exports = {
    initialSocket
}