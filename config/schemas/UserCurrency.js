const mongoose = require('mongoose');

const userCurrencySchema = new mongoose.Schema({
  // discord has super long numbers for ids
  currencyId: Number,
  userId: String,
  amount: Number,
  currencyLastAccruement: {
    type: Date,
    default: Date.now
  }
});

const UserCurrency = mongoose.model('UserCurrency', userCurrencySchema);
module.exports = UserCurrency;