"use strict";
var fs      = require('fs'),
    express = require('express'),
    app     = express(),
    server  = require('http').createServer(app),
    io      = require('socket.io')(server),
    router  = require('./router'),
    config  = require('./config');

// settings
app.set('views', config.views);
app.set('view engine', 'jade');
app.use('js',  express.static(config.js));
app.use('css', express.static(config.css));

// routing
app.use('/', router)
app.use('/login', router)
app.use('/admin/*', router)

io.sockets.on('connection', (socket) => {
   socket.on('emit_from_client', function(data) {
      var id = socket.id;
      //socket.broadcast.emit('emit_from_server', '[' + id + ']: ' + data);
      io.sockets.emit('emit_from_server', '[' + id + ']: ' + data);
      io.sockets.emit('get_quiz', { title: 'Question 1', body: 'hogehoge'})
   });
});

// server boot
server.listen(config.port, () => {
   console.info('server listening... http://localhost:' + config.port)
})
