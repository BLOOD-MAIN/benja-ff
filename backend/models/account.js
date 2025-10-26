const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  rank: String,
  status: String,
  photo: String
});

module.exports = mongoose.model('Account', AccountSchema);