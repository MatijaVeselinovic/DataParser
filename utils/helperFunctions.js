module.exports = findUniqueEntries = (value, index, self) => {
    return self.indexOf(value) === index;
}

module.exports = sortArray = (unsortedArray) => {
    return unsortedArray.sort((currentPath, nextPath) => nextPath.occurrence - currentPath.occurrence);
}

module.exports = ignoreFavicon = (req, res, next) => {
    if (req.originalUrl.includes('favicon.ico')) {
      res.status(204).end()
    }
    next();
}