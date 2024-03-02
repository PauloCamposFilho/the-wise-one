const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const EMOTES = require('../../constants/emotes');
const customId = 'timeout_button';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeoutbutton')
    .setDescription('Creates a button that times the users who click it.'),
  async execute(interaction) {
    const confirmButton = new ButtonBuilder()
      .setCustomId(customId)
      .setLabel('Click me')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
      .addComponents(confirmButton);

    await interaction.reply({
      content: EMOTES.xddTree,
      components: [row],
    });
  },
  async responseHandler(interaction) {
    try {
      if (interaction.customId === customId) {
        const nickname = interaction.member.nickname || interaction.member.user.globalName;
        await interaction.member.timeout(30_000);
        await interaction.reply({ content: EMOTES.xddTree, ephemeral: true });
        await interaction.followUp({ content: `${nickname} will be back soon.` });
      }
    }
    // cant timeout higher role members/admins/owners.
    catch (e) {
      console.error(e);
      interaction.followUp({ content: 'You are already one with The Woods.', ephemeral: true });
    }
  },
};