module.exports = findUniqueEntries = (value, index, self) => {
    return self.indexOf(value) === index;
}

module.exports = sortArray = (unsortedArray) => {
    return unsortedArray.sort((currentPath, nextPath) => nextPath.occurrence - currentPath.occurrence);
}