const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history');

// API Route: Get history
router.get('/', historyController.gethistory);

module.exports = router;