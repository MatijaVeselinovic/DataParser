const fs = require('fs');

class DataParser {
    constructor(logFilePath) {
        this.logFilePath = logFilePath;
        this.dataArray = [];
    }

    parseFileData = (data) => {
        for(let i in data) {
            if(i<5)
            console.log(data[i]);
        }
    }

    readFileData = (callbackFunction) => {
        fs.readFile(this.logFilePath, 'utf8', (error, data) => {
            if(error) throw error;
            var array = data.toString().split("\n");
            for(let i in array) {
                this.dataArray.push(array[i]);
            }
            callbackFunction(this.dataArray);
        });
    }
}

module.exports = DataParser