
var start = new Date();
var lines = 0;
var line = 0;

require('fs').createReadStream('worldcitiespop.txt')
  .pipe(require('csv2')())
  .on('data', function (){
    line++;
    lines++;
    line%30000===0 && console.log('%s lines', line)
  })
  .on('error', console.error)
  .on('end', function () {
    var end = new Date();
    console.log("%s seconds %s lines",
      (end-start)/1000, lines
    )
  });