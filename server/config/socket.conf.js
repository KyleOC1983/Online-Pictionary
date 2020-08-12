module.exports.listen = (server) => {
    const socketio = require('socket.io');
    io = socketio(server);
    io.on('connect', (socket) => {
        console.log('user connected')
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
        socket.on('new-message', (msg) => {
            io.emit('new-message', { msg })
        })
        socket.on('draw', (draw) => {
            io.emit('draw', draw)
        })
        socket.on('newTopic', (topic) => {
            io.emit('newTopic', topic)
        })
        socket.on('newRound', (roundInfo) => {
            io.emit('newRound', roundInfo)
        })
        socket.on('win', (winInfo) => {
            io.emit('win', winInfo)
        })
    })
    return io
}