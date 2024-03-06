const Insult = require('../config/schemas/Insult');
const randomTimeoutCheck = require('./randomTimeoutCheck');
const { getQuote } = require('../config/db/controllers/QuoteController');

const handleMessageResponse = async (msg, response) => {

  try {
    const { responseContent, responseModel, responseFilter } = response;
    let _responseContent = responseContent;

    // if responseContent passed a function, and a responseModel property, then it needs to interact with a responseModel component
    if (typeof responseContent === 'function' && responseModel) {
      _responseContent = await responseContent(responseModel, responseFilter);
    }

    // shouldnt happen, mistake was made.
    if (typeof responseContent === 'function' && !responseModel) {
      throw new Error('Malformed responseContent. No responseModel present');
    }

    // trolling check
    if (randomTimeoutCheck(msg.author.id, 33)) return msg.reply(`${await getQuote(Insult).content}`);
    if (randomTimeoutCheck(msg.author.id, 33)) return msg.member.timeout(60_000, `${await getQuote(Insult).content}`);

    // no trolling? respond
    if (_responseContent.attachment) await msg.channel.send({ files: _responseContent.attachment, content: _responseContent.content });
    if (!_responseContent.attachment) await msg.reply(_responseContent.content);
    if (_responseContent.followUpMessage) await msg.channel.send({ content: _responseContent.followUpMessage });

  }
  catch (e) {
    console.log("There was an error handling a response");
    console.log("the message")
    console.log(msg);
    console.log("the response");
    console.log(response);
  }


};

module.exports = handleMessageResponse;