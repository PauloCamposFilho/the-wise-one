const { Events } = require('discord.js');
const handleMessageResponse = require('../helpers/handleMessageResponse');
const theWiseTreeUserId = process.env.CLIENT_ID;

module.exports = {
  name: Events.MessageCreate,
  async execute(msg) {
    try {
      const client = msg.client;      
      const messageResponse = await client.messageResponses.get(msg.content)
      if (!messageResponse) return; // message does not trigger a bot response.
      const botCanTrigger = messageResponse.botCanTrigger || false;
      if (msg.author.id === theWiseTreeUserId && !botCanTrigger) return; // do not respond.
      handleMessageResponse(msg, messageResponse);
    } catch (e) {
      console.error(e);
    }
  }
};