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

.... Have been deleted. streams ain t fast.

Do this

```js
require('fs')
  .createReadStream('../worldcitiespop.txt')
  .pipe(require('csv2')())
```
Let s say you got an execution time of 6s.

Do that
```js
require('fs')
  .createReadStream('../worldcitiespop.txt')
  .pipe(require('csv2')())
  .pipe(through2.obj())
```

Not THAT much different, right ? 9s. boom. 30% slower.

So yes, streams are not a fast structure.

se also below some more testing i made.


## Read more

I tried to see if it s possible to make that faster.

I m not js guru and so far it is not concluding. see `attempts/`

I tried to split the load on 1+N processes and so far i used two ways to transport data from p1 to pN,

stdin / Net socket.

I can let you know that, on this computer@windows7@core i3, net socket is way much faster.

:sad: it s much easier to spawn and pipe a process than, spawn, start server, then write/listen to a socket.

## Some more

I also tested on a much stronger machine
```
grep "model name" /proc/cpuinfo
    model name      : Intel(R) Xeon(R) CPU E5-2420 0 @ 1.90GHz
    model name      : Intel(R) Xeon(R) CPU E5-2420 0 @ 1.90GHz
    model name      : Intel(R) Xeon(R) CPU E5-2420 0 @ 1.90GHz
    model name      : Intel(R) Xeon(R) CPU E5-2420 0 @ 1.90GHz
    model name      : Intel(R) Xeon(R) CPU E5-2420 0 @ 1.90GHz
    model name      : Intel(R) Xeon(R) CPU E5-2420 0 @ 1.90GHz
    model name      : Intel(R) Xeon(R) CPU E5-2420 0 @ 1.90GHz
    model name      : Intel(R) Xeon(R) CPU E5-2420 0 @ 1.90GHz
```

You know what, it was slower 100% of the time.... the most simple test of csv2.js took 14 seconds... !!
