const { performance } = require('perf_hooks');

const filename = process.argv[2];
const DataReader = require('../utils/DataReader');
const reader = new DataReader(filename);

const DataParser = require('../utils/DataParser');

require('../utils/helperFunctions');

exports.readAndParseLogFile = (req, res) => {
    try {
        // Start performance timer, just for curiosity
        const startTime = performance.now()
    
        // Make sure we got a filename as an argument
        if(process.argv.length < 3) {
            console.log('Script is missing an argument, provide a path to the log file');
            process.exit(1);
        }
    
        // Read from file and store into object array
        const formattedLogArray = reader.readFileData();
    
        // Instantiate parser with formattedLogArray as an argument
        const parser = new DataParser(formattedLogArray);
    
        // Use the appropriate class methods to retrieve different arrays
        const unsortedNonUniqueVisits = parser.getNonUniquePathVisits();
        const unsortedUniqueVisits = parser.getUniquePathVisits();
    
        // Use the helper function sortArray to sort both arrays
        const sortedNonUniquePathVisits = sortArray(unsortedNonUniqueVisits);
        const sortedUniquePathVisits = sortArray(unsortedUniqueVisits);
    
        // Finally send it to the view
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
}