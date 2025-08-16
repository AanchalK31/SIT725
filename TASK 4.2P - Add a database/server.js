const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const NumberEntry = require('./models/NumberEntry.js');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Route: Add two numbers and save result
app.post('/add', async (req, res) => {
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
});

// API Route: Get history
app.get('/history', async (req, res) => {
  try {
    const history = await NumberEntry.find().sort({ createdAt: -1 }).limit(10);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
