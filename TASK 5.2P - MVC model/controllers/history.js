const NumberEntry = require('../models/NumberEntry.js');
exports.gethistory = async (req, res) => {
  try {
    const history = await NumberEntry.find().sort({ createdAt: -1 }).limit(10);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
}