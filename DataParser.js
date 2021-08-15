class DataParser {
    constructor(formattedArray) {
        this.formattedArray = formattedArray;
        this.uniquePaths = [];
        this.pathVisits = [];
    }

    parseTheData = () => {
        this.getUniquePaths();
        this.getPathVisits();
        this.getParsedPaths();
    }

    // Get the list of unique paths in a path array
    getUniquePaths = () => {
        this.uniquePaths = this.formattedArray.map(arrayElement => { 
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
        this.formattedArray.forEach(arrayElement => {
            this.pathVisits.forEach(pathObject => {
                if(arrayElement.path === pathObject.path) {
                    pathObject.occurrence++;
                    pathObject.ipAddresses.push(arrayElement.ipAddress);
                };
            });
        });
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