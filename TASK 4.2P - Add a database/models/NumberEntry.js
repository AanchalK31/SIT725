const mongoose = require('mongoose');

const numberEntrySchema = new mongoose.Schema({
  a: Number,
  b: Number,
  result: Number,
}, { timestamps: true });

module.exports = mongoose.model('NumberEntry', numberEntrySchema);
