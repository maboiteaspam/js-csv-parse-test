
// pre cut by line, then split over N process and send via net.socket
// 4 slaves: 27 seconds, windows 7, core i3
// 3 slaves: 18 seconds, windows 7, core i3
// 2 slaves: 16 seconds, windows 7, core i3
// 1 slave: 19 seconds, windows 7, core i3


var flower = require('flower');
var spawn = require('child_process').spawn;
var net = require('net');

var slaves = [];
slaves.push(spawn('node', ['csv2-3', '--port', 6000 + slaves.length]))

var clients = [];
clients.push( net.connect({port: 6000 + clients.length}) )

var start = new Date();
var lines = 0;
var line = 0;
var stream = require('fs')
  .createReadStream('../worldcitiespop.txt')
  .pipe((function () {
    var t = '';
    return flower(function (chunk, enc, cb) {
      chunk = chunk.toString('utf-8')
      for (var i = 0; i < chunk.length ; i++) {
        t += chunk[i];
        if (chunk[i]==='\n') {
          this.push(t)
          t = '';
        }
      }
      cb(null)
    });
  })());

stream
  .on('data', function (d){
    clients[line].write(d)
    //slaves[line].stdin.write(d)
    lines++;
    line++;
    line = line>=slaves.length ? 0 : line;
  })
  .on('error', console.error)
  .on('end', function () {
    var end = new Date();
    console.log("master %s seconds, %s lines",
      (end-start)/1000, lines
    );
    process.nextTick(function () {
      clients.forEach(function (s){
        s.end()
      })
    })
  });


slaves.forEach(function (s){
  s.stdout.pipe(process.stdout)
})