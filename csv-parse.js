
var start = new Date();
var line = 0;
require('fs').createReadStream('worldcitiespop.txt')
  .pipe(require('csv-parse')())
  .on('data', function (){
    line++;
    line%1000===0 && console.log('%s lines', line)
  })
  .on('error', console.error)
  .on('end', function () {
    var end = new Date();
    console.log("%s seconds",
      (end-start)/1000
    )
  });