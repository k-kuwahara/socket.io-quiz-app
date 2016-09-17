"use strict";
var fs     = require('fs'),
    server = require('http').createServer(handler),
    config = require('./js/config'),
    io     = require('socket.io').listen(server);
server.listen(config.port);

function handler(req, res) {
   var file_path = __dirname + req.url
   switch (req.url) {
      case '/':
         fs.readFile(file_path + 'html/index.html', function(err, data) {
            if (err) {
               res.writeHead(500);
               return res.end('Error');
            }
            res.writeHead(200);
            res.write(data);
            res.end();
         })
         break

      case '/css/bootstrap.min.css':
         fs.readFile(file_path, 'utf-8', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/css' })
            res.end(data, 'utf-8')
         })
         break

      case '/js/bootstrap.min.js':
         fs.readFile(file_path, 'utf-8', function (err, data) {
             res.writeHead(200, { 'Content-Type': 'text/javascript' })
             res.end(data, 'utf-8')
         })
         break
   }
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
