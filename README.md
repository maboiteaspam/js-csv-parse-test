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

## Read more

I tried to see if it s possible to make that faster.

I m not js guru and so far it is not concluding. see `attempts/`

I tried to split the load on 1+N processes and so far i used two ways to transport data from p1 to pN,

stdin / Net socket.

I can let you know that, on this computer@windows7@core i3, net socket is way much faster.

:sad: it s much easier to spawn and pipe a process than, spawn, start server, then write/listen to a socket.

