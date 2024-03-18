const { Events } = require('discord.js');
const clientLoadUsers = require('../helpers/config/clientLoadUsers');
const helloWorldChannel = process.env.BOT_DEFAULT_CHANNEL;
const isSilentStart = process.argv[2] && process.argv[2] == '--silent';

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Client ID: ${client.user.id}`);
    clientLoadUsers(client);
    // any other functions or methods that need to be called go here:
    if (!isSilentStart) client.channels.cache.get(helloWorldChannel).send("I am returned");
  },
};