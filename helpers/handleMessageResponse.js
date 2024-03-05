const Insult = require('../config/schemas/Insult');
const randomTimeoutCheck = require('./randomTimeoutCheck');
const { getQuote } = require('../config/db/controllers/QuoteController');

const handleMessageResponse = async (msg, response) => {

  const { responseContent, responseArray, responseFilter } = response;
  let _responseContent = responseContent;

  // if responseContent passed a function, and a responseArray property, then it needs to interact with a responseArray component
  if (typeof responseContent === 'function' && responseArray) {
    _responseContent = await responseContent(responseArray, responseFilter);
  }

  // shouldnt happen, mistake was made.
  if (typeof responseContent === 'function' && !responseArray) {
    throw new Error('Malformed responseContent. No responseArray present');
  }

  // trolling check
  if (randomTimeoutCheck(msg.author.id, 33)) return msg.reply(`${await getQuote(Insult).content}`);
  if (randomTimeoutCheck(msg.author.id, 33)) return msg.member.timeout(60_000, `${await getQuote(Insult).content}`);

  // no trolling? respond
  if (_responseContent.attachment) await msg.channel.send({ files: _responseContent.attachment, content: _responseContent.content });
  if (!_responseContent.attachment) await msg.reply(_responseContent.content);
  if (_responseContent.followUpMessage) await msg.channel.send({ content: _responseContent.followUpMessage });

};

module.exports = handleMessageResponse;