// Controller that takes a generic _____Quote mongoose model and returns 
// a random entry from the collection

exports.getQuote = async (model) => {
  const quoteCount = await model.countDocuments();
  const randomIndex = Math.floor(Math.random() * quoteCount);
  const randomQuote = await model.findOne().skip(randomIndex).limit(1);
  return randomQuote.content;
};

exports.getQuoteCount = async (model) => {
  return model.countDocuments();
};