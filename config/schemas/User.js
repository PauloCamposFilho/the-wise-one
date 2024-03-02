const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String, // discord has super long numbers for ids
  steamId: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;