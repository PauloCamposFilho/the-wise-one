require('dotenv').config;
const CLIENT_ID = process.env.CLIENT_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the context command folders from the context-commands directory
const foldersPath = path.join(__dirname, 'context-commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
    }
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(BOT_TOKEN);

// deploy commands
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} context menu commands.`);
    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationCommand(CLIENT_ID),
      { body: commands },
    );
    console.log(`Successfully reloaded ${data.length} context menu commands.`);
  } catch (error) {
    console.error(error);
  }
})();