require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;
const THEWOODS_ID = process.env.THEWOODS_ID;
const { REST, Routes } = require('discord.js');

const rest = new REST().setToken(BOT_TOKEN);

// ...

// for guild-based commands
rest.put(Routes.applicationGuildCommands(CLIENT_ID, THEWOODS_ID), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);