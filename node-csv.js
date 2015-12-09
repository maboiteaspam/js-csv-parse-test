
var start = new Date();
var line = 0;
require('node-csv').createParser().parseFile('worldcitiespop.txt').on('data', function(data) {
  line++;
  line%1000===0 && console.log('%s lines', line)
}).on('end', function() {
  var end = new Date();
  console.log("%s seconds",
    (end-start)/1000
  )
})