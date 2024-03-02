const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // discord has super long numbers for ids
  id: String,
  steamId: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;