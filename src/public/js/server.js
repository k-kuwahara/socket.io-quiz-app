"use strict";

var fs = require('fs'),
    express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    config = require('./js/config');

app.set('views', config.views);
app.set('view engine', 'jade');
app.use('js', express.static(config.js));
app.use('css', express.static(config.css));

app.get('/', function (req, res) {});

io.sockets.on('connection', function (socket) {
   socket.on('emit_from_client', function (data) {
      var id = socket.id;
      console.log(data);

      io.sockets.emit('emit_from_server', '[' + id + ']: ' + data);
   });
});

server.listen(config.port);
console.info('server listening...');