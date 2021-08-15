const fs = require('fs');

class DataReader {
    constructor(logFilePath) {
        this.logFilePath = logFilePath;
        this.dataArray = [];
    }

    readFileData = () => {
            this.dataArray = [];
            const result = fs.readFileSync(this.logFilePath, 'utf8');
            const array = result.toString().split("\n");
            for(let i = 0; i < array.length; i++) {
                //each entry split on " " into respective attributes
                const subArray = array[i].split(" ");
                //increment by subArray length
                for(let j = 0; j < subArray.length; j+=subArray.length){
                    this.dataArray.push({
                        path: subArray[j],
                        ipAddress: subArray[j+1]
                    });
                } 
            }
            return this.dataArray;
    }
}

module.exports = DataReader