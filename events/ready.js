const { Events } = require('discord.js');
const clientLoadUsers = require('../helpers/config/clientLoadUsers');

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Client ID: ${client.user.id}`);
    clientLoadUsers(client);
  },
};