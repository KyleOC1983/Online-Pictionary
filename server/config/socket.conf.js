module.exports.listen = (server) => {
    const socketio = require('socket.io');
    io = socketio(server);
    io.on('connect', (socket) => {
        console.log('user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
        socket.on('displayName', (displayName) => {
            socket.displayName = displayName;
        })
        socket.on('joinGame', (displayName, gameId) => {
            socket.gameRoom = gameId;
            socket.displayName = displayName
            socket.join(gameId, ()=>{
                socket.to('host' + socket.gameRoom).emit('joinGame', socket.displayName, socket.gameRoom);
            });
            console.log('joined game ' + socket.gameRoom)
        })
        socket.on('leaveGame', () => {
            socket.to('host' + socket.gameRoom).emit('leaveGame', socket.displayName, socket.gameRoom);
            socket.gameRoom = null;
            socket.rooms = {};
        })
        socket.on('newMessage', (msg) => {
            io.to(socket.gameRoom).emit('newMessage', msg, socket.displayName);
        })
        socket.on('draw', (draw) => {
            console.log('hitting draw');
            console.log(socket.gameRoom);
            io.to(socket.gameRoom).emit('draw', draw);
        })
        socket.on('canDraw', (canDraw)=>{
            io.to(socket.gameRoom).emit('canDraw', canDraw);
        })
        socket.on('newTopic', () => {
            console.log('socket server');
            console.log(socket.gameRoom);
            io.to('host' + socket.gameRoom).emit('newTopic', socket.gameRoom);
        })
        socket.on('newRound', () => {
            io.to('host' + socket.gameRoom).emit('newRound', socket.gameRoom);
        })
        socket.on('win', () => {
            io.to('host' + socket.gameRoom).emit('win', socket.displayName, socket.gameRoom);
            
        })
        socket.on('gameEnd', () => {
            io.to('host' + socket.gameRoom).emit('gameEnd', socket.gameRoom);
        })
        socket.on('createGame', (gameId)=>{
            console.log('joining host game');
            socket.join('host' + gameId);
            console.log('joined ' + gameId)
        })
        socket.on('clearBoard', (clear)=>{
            io.to(socket.gameRoom).emit('clearBoard', clear);
        })
    })
    return io;
}