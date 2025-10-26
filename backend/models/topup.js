const mongoose = require('mongoose');

const TopUpSchema = new mongoose.Schema({
  item: String,
  price: Number,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TopUp', TopUpSchema);