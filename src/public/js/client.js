'use strict';

$(function () {
   var socket = io.connect();

   $('#my_form').submit(function (e) {
      e.preventDefault();
      socket.emit('emit_from_client', $('#msg').val());
      $('#msg').val('').focus();
   });

   socket.on('emit_from_server', function (data) {
      $('#logs').append($('<li>').text(data));
   });

   socket.on('get_quiz', function (data) {
      $("#quiz_modal").fadeIn("slow");
      $('#modal_title').innerText(data.title);
   });
});