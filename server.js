var express = require('express');
var path = require('path');
var routes = require('./config/routes');
var bodyParser = require('body-parser');
var PORT = process.env.Port || 3000;
var app = express();

require('dotenv').load()


app.use(express.static(path.join(__dirname, 'public')));
// app.use(function(req,res) {
//     res.sendFile(__dirname + '/public/views/index.html')
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(PORT, function() {
    console.log('Listening on Port 3000');
});

module.exports = app;