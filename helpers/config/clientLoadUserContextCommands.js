const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const clientLoadUserContextCommands = (client) => {
  client.userContextCommands = new Collection();
  // Load userContextCommands into collection
  const commandsPath = path.join(__dirname, '../..', 'context-commands/users');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
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