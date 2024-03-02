const { SlashCommandBuilder } = require('discord.js');
const slashCommandRolePermissions = require('../../constants/slashCommandRolePermissions');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('speak')
    .setDescription('Speak with the voice of the ancient one')
    .addStringOption(option => option.setName('message')
      .setDescription('The Message to be sent')
      .setRequired(true)),
  async execute(interaction) {
    try {
      const theMessage = interaction.options.getString('message');
      await interaction.reply({ content: 'You speak with my voice', ephemeral: true });
      await interaction.channel.send({ content: theMessage });
    } catch (e) {
      console.log(e);
    }
  },
  memberCanExecute(member) {
    return !!member.roles.cache.get(this.roleRequired);
  },
  roleRequired: slashCommandRolePermissions.admin
}