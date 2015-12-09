var argv = require('minimist')(process.argv.slice(2));

var net = require('net');

var start = new Date();
var line = 0;
var lines = 0;

var server = net.createServer(function (socket) {
  socket.on('end', function() {
    server.close()
  });

  socket
    .pipe(require('csv2')())
    .on('data', function (d){
      lines++;
      line++;
      line%30000===0 && console.log('%s: %s lines', argv.port, line)
    })
    .on('error', console.error)
    .on('end', function () {
      var end = new Date();
      console.log("%s %s seconds, %s lines",
        argv.port,
        (end-start)/1000,
        lines
      )
    });

});

server.listen(argv.port);

