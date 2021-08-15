const express = require('express');
const { performance } = require('perf_hooks');

const app = express();
const filename = process.argv[2];

const DataReader = require('./DataReader');
const parser = new DataReader(filename);

const findUniqueEntries = (value, index, self) => {
  return self.indexOf(value) === index;
}

app.get('/', function (req, res) {
  const startTime = performance.now()
  // Make sure we got a filename as an argument
  if(process.argv.length < 3) {
    console.log('Script is missing an argument, provide a path to the log file');
    process.exit(1);
  }

  // Read from file and store into object array
  const formattedArray = parser.readFileData();

  // Get the list of unique paths in a path array
  const uniquePaths = formattedArray.map(arrayElement => { 
    return arrayElement.path;
  }).filter(findUniqueEntries);

  //Prepare the object array
  const pathVisits = uniquePaths.map(path => {
    return {
      path,
      occurance: 0,
      ipAddresses: []
    }
  });

  // Count the number of occurances and push all ip addresses related to the certain path
  formattedArray.forEach(arrayElement => {
    pathVisits.forEach(pathObject => {
      if(arrayElement.path === pathObject.path) {
        pathObject.occurance++;
        pathObject.ipAddresses.push(arrayElement.ipAddress);
      };
    });
  });

  // Create a non unique path visits object array
  const nonUniquePathVisits = pathVisits.map(pathObject => {
    return {
      path: pathObject.path,
      occurance: pathObject.occurance
    }
  });

  // Create an unique path visits object array
  const uniquePathVisits = pathVisits.map(pathObject => {
    const uniqueIpAddressOccurances = pathObject.ipAddresses.filter(findUniqueEntries).length;
    return {
      path: pathObject.path,
      uniqueOccurances: uniqueIpAddressOccurances
    }
  });

  // Sort the non-unique list in descending order
  nonUniquePathVisits.sort((currentPath, nextPath) => nextPath.occurance - currentPath.occurance);

  // Sort the unique list in descending order
  uniquePathVisits.sort((currentPath, nextPath) => nextPath.occurance - currentPath.occurance);

  console.log("Number of non unique path visits in descending order:");
  console.log(nonUniquePathVisits);

  console.log("Number of unique path visits in descending order:");
  console.log(uniquePathVisits);

  res.send("<p>Looks like you are done, check out your console!</p>");

  const endTime = performance.now()
  console.log("Task took " + (endTime - startTime) + " milliseconds.")
});

app.listen(3000, function () {
  console.log('App launched on localhost:3000');
});