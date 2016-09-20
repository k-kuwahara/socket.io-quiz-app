const HTTP = require('http');
const PATH = require('path');
const PAGES = [
   {route: '', output:'admin'},
   {route: 'post', output:'Posting Q&A'},
   {route: 'another', output: function() {return 'another' + this.route;}}
];

HTTP.createServer(function (request, response) {

   var lookup = PATH.basename(decodeURI(request.url));
   PAGES.forEach(function(page) {
       if (page.route == lookup) {
           response.writeHead(200, {'Content-Type': 'text/html'});
           response.end(typeof page.output === 'function' ? page.output() : page.output);
       }
   });

   if (!response.finished) {
       response.writeHead(404);
       response.end('404 Not Found');
   }

}).listen(8080);
