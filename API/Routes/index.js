const express = require('express');
const router = express.Router();

router.use('/task',require('./task'))

module.exports = router