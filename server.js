"use strict";
var fs     = require('fs');
var server = require('http').createServer();
var config = require('./config');

server.on('request', function(req, res) {
  var stream = fs.createReadStream('index.html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  stream.pipe(res);
});
var io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.emit('greeting', {message: 'hello'}, function (data) {
    console.log('result: ' + data);
  });
});

server.listen(config.port);
console.info('server listening...');
