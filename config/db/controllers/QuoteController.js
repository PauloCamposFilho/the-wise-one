// Controller that takes a generic _____Quote mongoose model and returns
// a random entry from the collection

exports.getQuote = async (model, responseFilter) => {
  const quoteCount = await model.countDocuments(responseFilter);
  console.log("quoteCount:", quoteCount);
  const randomIndex = Math.floor(Math.random() * quoteCount);
  const randomQuote = await model.findOne(responseFilter).skip(randomIndex).limit(1);
  return randomQuote;
};

exports.getQuoteCount = async (model) => {
  return model.countDocuments();
};