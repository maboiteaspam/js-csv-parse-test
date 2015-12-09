# JS csv parse - tests

A repo to test about node js csv parser library available out there.

I wanted to compare with https://github.com/uniVocity/csv-parsers-comparison

## Tested

I made a little search on github to get me some csv parsing lib.

- rvagg/csv2
- wdavidw/node-csv-parse
- klaemo/csv-stream
- voodootikigod/node-csv
- koles/ya-csv

There are maybe more out there.

## Data

It is using the file available here
http://www.maxmind.com/download/worldcities/worldcitiespop.txt.gz

## Results

.. are surprising..

Lib  | duration
------------- | -------------
rvagg/csv2  | ~~ 9 seconds
wdavidw/node-csv-parse  | broken ;/
klaemo/csv-stream  | ~~ 55 seconds
voodootikigod/node-csv  | broken ;/
koles/ya-csv  | broken ;/


Bravo @rvagg !

Those which are broken are probably fixable, feel free to PR.

