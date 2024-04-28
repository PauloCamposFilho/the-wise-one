const { Collection } = require('discord.js');
const fs = require('node:path');
const path = require('node:path');

const clientLoadUserContextCommands = (client) => {
  client.userContextCommands = new Collection();
  // Load userContextCommands into collection
  const commandsPath = path.join(__dirname, '../..', 'context-commands/users');
  for (const file of commandsPath) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ((!'data') in command && (!'execute') in command) {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      continue;
    }
    client.userContextCommands.set(command.data.name, command);
  }
};

module.exports = clientLoadUserContextCommands;