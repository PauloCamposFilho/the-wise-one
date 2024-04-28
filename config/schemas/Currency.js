const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  id: Number,
  name: String,
  accruementAmount: Number,
  accruementTimespan: Number,
  maxAmount: Number  
});

const Currency = mongoose.model('Currency', currencySchema);
module.exports = Currency;