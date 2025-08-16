const express = require('express');
const router = express.Router();
const numberController = require('../controllers/number');

// API Route: Add two numbers and save result
router.post('/',numberController.add);

module.exports = router;
