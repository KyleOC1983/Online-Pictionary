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
        socket.on('joinGame', (gameId) => {
            socket.gameRoom = gameId;
            socket.join(gameId, ()=>{
                socket.to('host' + socket.gameRoom).emit('joinGame', socket.displayName);
            });
            console.log('joined game ' + socket.gameRoom)
        })
        socket.on('leaveGame', () => {
            socket.to('host' + socket.gameRoom).emit('leaveGame', socket.displayName);
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
        socket.on('newTopic', () => {
            io.to('host' + socket.gameRoom).emit('newTopic');
        })
        socket.on('newRound', () => {
            io.to('host' + socket.gameRoom).emit('newRound');
        })
        socket.on('win', () => {
            io.to('host' + socket.gameRoom).emit('win', socket.displayName);
            io.to('host' + socket.gameRoom).emit('newRound');
        })
        socket.on('gameEnd', () => {
            io.to('host' + socket.gameRoom).emit('gameEnd');
        })
        socket.on('createGame', (gameId)=>{
            socket.join('host/game/' + gameId);
        })
    })
    return io;
}