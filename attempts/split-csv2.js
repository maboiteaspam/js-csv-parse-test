
// pre cut by line, then split over N process and send via stdIO
// 15 slaves: 70 seconds, windows 7, core i3
// 8 slaves: 70 seconds, windows 7, core i3
// 4 slaves: 60 seconds, windows 7, core i3
// 3 slaves: 58 seconds, windows 7, core i3
// 2 slaves: 52 seconds, windows 7, core i3
// 1 slave: 45 seconds, windows 7, core i3

var flower = require('flower');
var spawn = require('child_process').spawn;

var slaves = [];
slaves.push(spawn('node', ['csv2-1']))

var start = new Date();
var line = 0;
require('fs')
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
  })())
  .on('data', function (d){
    slaves[line].stdin.write(d)
    line++;
    line = line>=slaves.length ? 0 : line;
  })
  .on('error', console.error)
  .on('end', function () {
    var end = new Date();
    console.log("master %s seconds",
      (end-start)/1000
    );
    process.nextTick(function () {
      slaves.forEach(function (s){
        s.kill()
      })
    })
  });

slaves.forEach(function (s){
  s.stdout.pipe(process.stdout)
})
