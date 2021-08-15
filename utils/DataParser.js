class DataParser {
    constructor(formattedLogArray) {
        this.formattedLogArray = formattedLogArray;
        this.uniquePaths = [];
        this.pathVisits = [];
    }

    // Get the list of unique paths in a path array
    getUniquePaths = () => {
        this.uniquePaths = this.formattedLogArray.map(arrayElement => { 
            return arrayElement.path;
        }).filter(findUniqueEntries);
    }
     
    //Prepare the object array
    getPathVisits = () => {
        this.pathVisits = this.uniquePaths.map(path => {
            return {
              path,
              occurrence: 0,
              ipAddresses: [],
            }
        });
    }
  
    // Count the number of occurances and push all ip addresses related to the certain path
    getParsedPaths = () => {
        this.formattedLogArray.forEach(arrayElement => {
            this.pathVisits.forEach(pathObject => {
                if(arrayElement.path === pathObject.path) {
                    pathObject.occurrence++;
                    pathObject.ipAddresses.push(arrayElement.ipAddress);
                };
            });
        });
    }

    // Aggregate function to parse the formatted array
    parseTheData = () => {
        this.getUniquePaths();
        this.getPathVisits();
        this.getParsedPaths();
    }

    // Create a non unique path visits object array
    getNonUniquePathVisits = () => {
        this.parseTheData();
        let nonUniquePathVisits = this.pathVisits.map(pathObject => {
            return {
                path: pathObject.path,
                occurrence: pathObject.occurrence
            }
        });
        return nonUniquePathVisits;
    }

    // Create an unique path visits object array
    getUniquePathVisits = () => {
        this.parseTheData();
        let uniquePathVisits = this.pathVisits.map(pathObject => {
            const uniqueIpAddressOccurrences = pathObject.ipAddresses.filter(findUniqueEntries).length;
            return {
              path: pathObject.path,
              occurrence: uniqueIpAddressOccurrences
            }
        });
        return uniquePathVisits;
    }
}

module.exports = DataParser