
var start = new Date();
var line = 0;
var csv = require('ya-csv');

var reader = csv.createCsvStreamReader(
  require('fs').createReadStream('worldcitiespop.txt')
);

reader.addListener('data', function(data) {
  line++;
  line%1000===0 && console.log('%s lines', line)
});
reader.addListener('end', function() {
  var end = new Date();
  console.log("%s seconds",
    (end-start)/1000
  )
});
