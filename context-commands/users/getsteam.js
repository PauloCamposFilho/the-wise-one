const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { getUserInfo } = require('../../config/db/controllers/UserController');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Get Steam Info')
    .setType(ApplicationCommandType.User),
  async execute(interaction) {
    try {
      console.log(interaction);
    } catch (error) {
      await interaction.reply({ content: `There was a problem... ${error}`, ephemeral: true });
    }
  }
};