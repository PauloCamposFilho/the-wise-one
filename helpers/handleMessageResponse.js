const Insult = require('../config/schemas/Insult');
const randomTimeoutCheck = require('./randomTimeoutCheck');
const { getQuote } = require('../config/db/controllers/QuoteController');
const failChance = process.env.BOT_FAIL_CHANCE;

const handleMessageResponse = async (msg, response) => {
  let _responseContent = {};
  try {
    const { responseContent, responseModel, responseFilter, followUpMessage, attachment } = response;
    _responseContent.content = responseContent;
    _responseContent.followUpMessage = followUpMessage;
    _responseContent.attachment = attachment;

    // if responseContent passed a function, and a responseModel property, then it needs to interact with a responseModel component
    if (typeof responseContent === 'function' && responseModel) {
      _responseContent = await responseContent(responseModel, responseFilter);
    }

    // shouldnt happen, mistake was made.
    if (typeof responseContent === 'function' && !responseModel) {
      throw new Error('Malformed responseContent. No responseModel present');
    }

    // trolling check
    if (randomTimeoutCheck(msg.author.id, failChance)) return await msg.reply(`${(await getQuote(Insult)).content}`);
    if (randomTimeoutCheck(msg.author.id, failChance)) return await msg.member.timeout(60_000, `${(await getQuote(Insult)).content}`);

    // no trolling? respond
    await msg.reply({ files: _responseContent.attachment, embeds: _responseContent.embeds, content: _responseContent.content });
    if (_responseContent.followUpMessage) await msg.channel.send({ content: _responseContent.followUpMessage });

  }
  catch (e) {
    console.log("There was an error handling a response");
    console.log("the message")
    console.log(msg);
    console.log("the response");
    console.log(response);
    console.log(e);
  }


};

module.exports = handleMessageResponse;