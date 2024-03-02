// a light-hearted ribbing when the bot has had enough of being used.
const mongoose = require('mongoose');

const InsultSchema = new mongoose.Schema({
  content: String
});

const Insult = mongoose.model('Insult', InsultSchema);
module.exports = Insult;