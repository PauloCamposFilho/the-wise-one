const mongoose = require('mongoose');

const UserQuoteSchema = new mongoose.Schema({
  content: String
});

const UserQuote = mongoose.model('UserQuote', UserQuoteSchema);
module.exports = UserQuote;