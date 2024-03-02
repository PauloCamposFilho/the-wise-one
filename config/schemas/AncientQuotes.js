const mongoose = require('mongoose');

const AncientQuoteSchema = new mongoose.Schema({
  content: String,
});

const AncientQuote = mongoose.model('AncientQuote', AncientQuoteSchema);
module.exports = AncientQuote;