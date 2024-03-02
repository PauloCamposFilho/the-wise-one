const Insult = require('../config/schemas/Insult');
const randomTimeoutCheck = require('./randomTimeoutCheck');
const { getQuote } = require('../config/db/controllers/QuoteController');

const handleMessageResponse = async (msg, response) => {

  const { responseContent, responseArray, followUpMessage, attachment } = response;
  let _responseContent = responseContent;

  // if responseContent passed a function, and a responseArray property, then it needs to interact with a responseArray component
  if (typeof responseContent === 'function' && responseArray) {
    _responseContent = await responseContent(responseArray);
  }

  if (typeof responseContent === 'function' && !responseArray) { // shouldnt happen, mistake was made.
    throw new Error('Malformed responseContent. No responseArray present');
  }

  // trolling check
  if (randomTimeoutCheck(msg.author.id, 33)) return msg.reply(`${await getQuote(Insult)}`);
  if (randomTimeoutCheck(msg.author.id, 33)) return msg.member.timeout(60_000, `${await getQuote(Insult)}`);

  // no trolling? respond
  if (attachment) await msg.channel.send({ files: attachment, content: _responseContent });
  if (!attachment) await msg.reply(_responseContent);
  if (followUpMessage) await msg.channel.send({ content: followUpMessage });

};

module.exports = handleMessageResponse;