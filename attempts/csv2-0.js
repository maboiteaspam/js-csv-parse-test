
// pre cut by line, then send to csv2.

var start = new Date();
var line = 0;
require('fs')
  .createReadStream('../worldcitiespop.txt')
  .pipe((function () {
    var t = '';
    return require('flower')(function (chunk, enc, cb) {
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
  .pipe(require('csv2')())
  .on('data', function (){
    line++;
    line%30000===0 && console.log('%s lines', line)
  })
  .on('error', console.error)
  .on('end', function () {
    var end = new Date();
    console.log("%s seconds",
      (end-start)/1000
    )
  });