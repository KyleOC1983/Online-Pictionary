module.exports.listen = (server) => {
    const socketio = require('socket.io');
    io = socketio(server);
    io.on('connect', (socket) => {
        socket.on('disconnect', () => {
            socket.to('host' + socket.gameRoom).emit('leaveGame', socket.displayName, socket.gameRoom)
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
            
        })
        socket.on('leaveGame', () => {
            socket.to('host' + socket.gameRoom).emit('leaveGame', socket.displayName, socket.gameRoom);
            socket.gameRoom = null;
            socket.rooms = {};
        })
        socket.on('newMessage', (msg) => {
            io.to(socket.gameRoom).emit('newMessage', msg);
        })
        socket.on('draw', (draw) => {
            
            io.to(socket.gameRoom).emit('draw', draw);
        })
        socket.on('canDraw', (canDraw)=>{
            io.to(socket.gameRoom).emit('canDraw', canDraw);
        })
        socket.on('newTopic', () => {
    
            io.to('host' + socket.gameRoom).emit('newTopic', socket.gameRoom);
        })
        socket.on('newRound', () => {
            io.to('host' + socket.gameRoom).emit('newRound', socket.gameRoom);
        })
        socket.on('win', () => {
            io.to('host' + socket.gameRoom).emit('win', socket.displayName, socket.gameRoom);
            
        })
        socket.on('gameEnd', (allUsers) => {
            io.to('host' + socket.gameRoom).emit('gameEnd', socket.gameRoom, allUsers);
        })
        socket.on('winner', (winner) => {
            io.to(socket.gameRoom).emit('winner', winner)
        })
        socket.on('createGame', (displayName, gameId)=>{
            socket.gameRoom = gameId;
            socket.displayName = displayName;
            socket.join(gameId);
            
            socket.join('host' + gameId);
            
        })
        socket.on('clearBoard', (clear)=>{
            io.to(socket.gameRoom).emit('clearBoard', clear);
        })
        socket.on('startTimer', (time)=>{
            io.to(socket.gameRoom).emit('startTimer', time);
        })
    })
    return io;
}