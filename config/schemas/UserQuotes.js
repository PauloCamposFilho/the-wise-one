const mongoose = require('mongoose');

const UserQuoteSchema = new mongoose.Schema({
  // the text content that is to be sent to the channel when it is triggered. (required)
  content: String,
  // used in the responseFilter object of the bot-replies (optional)
  author: String,
  // files to be attached/embeded with the message (optional)
  attachment: Array,
  // another text message to be fired after sending the primary text and attachments (optional)
  followUpMessage: String,
});

const UserQuote = mongoose.model('UserQuote', UserQuoteSchema);
module.exports = UserQuote;