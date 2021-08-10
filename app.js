const express = require('express');

const app = express();
const filename = process.argv[2];

let DataParser = require('./DataParser');

let parser = new DataParser(filename);

app.get('/', function (req, res) {
  // Make sure we got a filename on the command line.
  if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }
  parser.readFileData(parser.parseFileData);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});