const { Client, GatewayIntentBits, Partials } = require('discord.js');
const clientLoadSlashCommands = require('../helpers/config/clientLoadSlashCommands');
const clientLoadBotTriggers = require('../helpers/config/clientLoadBotTriggers');
const clientLoadEvents = require('../helpers/config/clientLoadEvents');
const clientLoadTests = require('../helpers/config/clientLoadTests');
const clientLoadEmitters = require('../helpers/config/clientLoadEmitters');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

clientLoadSlashCommands(client);
clientLoadBotTriggers(client);
clientLoadEvents(client);
clientLoadTests(client);
clientLoadEmitters(client);

module.exports = { client };