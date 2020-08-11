const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname+"/dist"));
app.get('*', (req, res)=>{
    res.sendFile('/dist/index.html', { root: __dirname + '/'});
});

app.listen(port);