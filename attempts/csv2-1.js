
var start = new Date();
var line = 0;
process.stdin
  .pipe(require('csv2')())
  .on('data', function (d){
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