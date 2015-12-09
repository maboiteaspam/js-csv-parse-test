
// pre cut by line, then send to csv2.

var start = new Date();
var line = 0;
var flower = require('flower')
var through2 = require('through2')

require('fs')
  .createReadStream('../worldcitiespop.txt')
  .pipe(require('csv2')())
  .pipe(through2.obj())
  .pipe(through2.obj())
  .pipe(through2.obj())
  .pipe(through2.obj())
  .pipe(through2.obj())
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