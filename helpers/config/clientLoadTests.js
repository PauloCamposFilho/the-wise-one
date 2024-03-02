const { getQuoteCount } = require('../../config/db/controllers/QuoteController');
const AncientQuote = require('../../config/schemas/AncientQuotes');
const Insult = require('../../config/schemas/Insult');

const clientLoadTests = async (client) => {
  const triggerCount = client.messageResponses.size;
  const quoteCount = await getQuoteCount(AncientQuote);
  const insultCount = await getQuoteCount(Insult);
  console.log(`Loaded ${insultCount} insult${insultCount > 1 ? 's' : ''}`);
  console.log(`Loaded ${quoteCount} Ancient One quote${quoteCount > 1 ? 's' : ''}`);
  console.log(`Loaded ${triggerCount} trigger${triggerCount > 1 ? 's' : ''}.`);
};

module.exports = clientLoadTests;