const express = require('express');

const logDataController = require('../controllers/logData');

const router = express.Router();

router.get('/', logDataController.readAndParseLogFile);

module.exports = router;