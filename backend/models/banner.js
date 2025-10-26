const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
  image: String,
  text: String
});

module.exports = mongoose.model('Banner', BannerSchema);