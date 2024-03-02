const { SlashCommandBuilder } = require('discord.js');
const EMOTES = require('../../constants/emotes');
const { getQuote } = require('../../config/db/controllers/QuoteController');
const AncientQuote = require('../../config/schemas/AncientQuotes');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wisdom')
    .setDescription('Have the ancient one impart some of its wisdom unto you.'),
  async execute(interaction) {
    try {
      const message = await interaction.reply(
        {
          content: await getQuote(AncientQuote),
          fetchReply: true
        });
      message.react(EMOTES.xddTree);
    } catch (e) {
      console.error(e);
    }
  }
};