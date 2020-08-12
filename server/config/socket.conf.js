module.exports.listen = (server) => {
    const socketio = require('socket.io');
    io = socketio(server);
    io.on('connect', (socket) => {
        console.log('user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
        socket.on('joinGame', (gameId) => {
            socket.gameRoom = gameId;
            socket.join(gameId, ()=>{
                // socket.to(socket.gameRoom).emit('getState');
            });
            console.log('joined game ' + socket.gameRoom)
        })
        socket.on('leaveGame', () => {
            socket.gameRoom = null;
            socket.rooms = {};
        })
        socket.on('newMessage', (msg) => {
            io.to(socket.gameRoom).emit('newMessage', msg);
        })
        socket.on('draw', (draw) => {
            console.log('hitting draw');
            console.log(socket.gameRoom);
            io.to(socket.gameRoom).emit('draw', draw);
        })
        socket.on('canDraw', (canDraw)=>{
            io.to(socket.gameRoom).emit('canDraw', canDraw);
        })
        socket.on('newTopic', (topic) => {
            io.to(socket.gameRoom).emit('newTopic', topic);
        })
        socket.on('newRound', (roundInfo) => {
            io.to(socket.gameRoom).emit('newRound', roundInfo);
        })
        socket.on('win', (winInfo) => {
            io.to(socket.gameRoom).emit('win', winInfo);
        })
        socket.on('gameEnd', (gameEnd) => {
            io.to(socket.gameRoom).emit('gameEnd', gameEnd);
        })
        socket.on('setState', (state)=>{
            io.to(socket.gameRoom).emit('setState', state);
        })
    })
    return io;
}