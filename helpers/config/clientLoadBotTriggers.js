const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const clientLoadBotTriggers = (client) => {
  client.messageResponses = new Collection();
  // Load bot text triggers/responses into collection
  const botRepliesPath = path.join(__dirname, '../..', 'bot-replies');
  const botRepliesFiles = fs.readdirSync(botRepliesPath).filter(file => file.endsWith('.js'));

  for (const file of botRepliesFiles) {
    // check that it isn't one of the example files... those shouldnt be loaded.
    if (file.indexOf("example") == -1) {
      const filePath = path.join(botRepliesPath, file);
      const reply = require(filePath);
      // make sure the bot reply has at least a trigger and a text response.
      if ('trigger' in reply && 'responseContent' in reply) {
        const triggers = Array.isArray(reply.trigger) ? reply.trigger : [reply.trigger];
        for (const trigger of triggers) {
          client.messageResponses.set(trigger, reply);
        }
      }
    }
  }
};

module.exports = clientLoadBotTriggers;