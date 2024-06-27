const { SlashCommandBuilder } = require('discord.js');
const slashCommandRolePermissions = require('../../constants/slashCommandRolePermissions');
const { toCursive } = require('../../helpers/toCursive');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('awesome')
    .setDescription('Tell Paul he is AWESOME!'),
  async execute(interaction) {
    try {
      const sender = interaction.member.nickname || interaction.member.user.globalName;
      console.log(sender);
      console.log(interaction.member);
      console.log(toCursive(sender));
      const theMessage = `Hey Paul-\nThanks so much!\nYOU ARE AWESOME!!! ☺\n\nHave a great weekend.\n\nThank you,\n${toCursive(sender)}`
      await interaction.reply({ content: 'You speak with my voice', ephemeral: true });
      await interaction.channel.send({ content: theMessage });
    }
    catch (e) {
      console.log(e);
    }
  },
  memberCanExecute(member) {
    return !!member.roles.cache.get(this.roleRequired);
  },
  roleRequired: slashCommandRolePermissions.admin,
};