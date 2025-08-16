const express = require('express');
const mongoose = require('mongoose');
const addRoutes = require('./routes/number');
const historyRoutes = require('./routes/history');
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

app.use('/add', addRoutes);
app.use('/history', historyRoutes);


// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
