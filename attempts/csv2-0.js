
// pre cut by line, then send to csv2.

var start = new Date();
var line = 0;
var flower = require('flower')
var through2 = require('through2')
var csv2 = require('csv2')();
csv2.resume()
require('fs')
  .createReadStream('../worldcitiespop.txt')
  .pipe((function () {
    var t = '';
    return flower(function (chunk, enc, cb) {
      t += chunk.toString('utf-8');
      var k = t.split(/\n/);
      var p = 0;
      for(var i=0;i<k.length-1;i++) {
        this.push(k[i]+'\n')
        p+=k[i].length
      }
      t = t.substr(p)
      cb(null)
    });
  })())
  .pipe(csv2)
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