"use strict";
var fs     = require('fs'),
    server = require('http').createServer(handler),
    config = require('./js/config'),
    io     = require('socket.io').listen(server);
server.listen(config.port);

function handler(req, res) {
   fs.readFile(__dirname + '/html/index.html', function(err, data) {
      if (err) {
         res.writeHead(500);
         return res.end('Error');
      }
      res.writeHead(200);
      res.write(data);
      res.end();
   })
}

io.sockets.on('connection', function(socket) {
   socket.on('emit_from_client', function(data) {
      var id = socket.id;
      console.info(data);
      //socket.broadcast.emit('emit_from_server', '[' + id + ']: ' + data);
      io.sockets.emit('emit_from_server', '[' + id + ']: ' + data);
   });
});

console.info('server listening...');
