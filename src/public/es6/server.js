"use strict";
var fs      = require('fs'),
    express = require('express'),
    app     = express(),
    server  = require('http').createServer(app),
    io      = require('socket.io')(server),
    config  = require('./js/config');

// settings
app.set('views', config.views);
app.set('view engine', 'jade');
app.use('js',  express.static(config.js));
app.use('css', express.static(config.css));

app.get('/', (req, res) => {
   
})

io.sockets.on('connection', (socket) => {
   socket.on('emit_from_client', function(data) {
      var id = socket.id;
      console.log(data);
      //socket.broadcast.emit('emit_from_server', '[' + id + ']: ' + data);
      io.sockets.emit('emit_from_server', '[' + id + ']: ' + data);
   });
});

// server boot
server.listen(config.port);
console.info('server listening...');
