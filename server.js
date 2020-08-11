const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const io = require('./server/config/socket.conf').listen(app);

app.use(bodyParser.json());
app.use(express.static(__dirname+"/dist"));
app.get('*', (req, res)=>{
    res.sendFile('/dist/index.html', { root: __dirname + '/'});
});
app.use(io);

app.listen(port);