const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('./server/config/socket.conf').listen(server);

app.use(bodyParser.json());
app.use(express.static(__dirname+"/dist"));
app.get('*', (req, res)=>{
    res.sendFile('/dist/index.html', { root: __dirname + '/'});
});

server.listen(port);