const NumberEntry = require('../models/NumberEntry.js');
exports.add = async (req, res) => {
  try {
    const { a, b } = req.body;
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) {
      return res.status(400).json({ error: 'Invalid numbers' });
    }

    const result = numA + numB;

    // Save entry to MongoDB
    const entry = new NumberEntry({ a: numA, b: numB, result });
    await entry.save();

    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}