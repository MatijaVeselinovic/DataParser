const express = require('express');
const path = require('path');
const { performance } = require('perf_hooks');

const filename = process.argv[2];

const DataReader = require('./DataReader');
const reader = new DataReader(filename);

const DataParser = require('./DataParser');

require('./utils/helperFunctions');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, "css")));

app.get('/', (req, res) => {
  try {
    const startTime = performance.now()

    // Make sure we got a filename as an argument
    if(process.argv.length < 3) {
      console.log('Script is missing an argument, provide a path to the log file');
      process.exit(1);
    }

    // Read from file and store into object array
    const formattedArray = reader.readFileData();

    const parser = new DataParser(formattedArray);

    const unsortedNonUniqueVisits = parser.getNonUniquePathVisits();
    const unsortedUniqueVisits = parser.getUniquePathVisits();
  
    let sortedNonUniquePathVisits = sortArray(unsortedNonUniqueVisits);
    let sortedUniquePathVisits = sortArray(unsortedUniqueVisits);

    let someLength = 0;
    console.log(formattedArray.length);
    sortedUniquePathVisits.forEach(element => {
      someLength += element.occurrence;
    });
    console.log(someLength)

    res.render("index", {
      sortedNonUniquePathVisits,
      sortedUniquePathVisits
    });

    //Curious about how much time this actually takes? :)
    const endTime = performance.now()
    console.log("Reading and parsing task took " + (endTime - startTime) + " milliseconds.");
  }
  catch (err) {
    throw new Error(err);
  }
});

app.listen(3000, () => {
  console.log("App launched on localhost:3000");
});