const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const slashCommandRolePermissions = require('../../constants/slashCommandRolePermissions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('commands')
    .setDescription('Shows list of triggers available for bot content'),
  async execute(interaction) {
    try {
      const client = interaction.client;
      const responseMessages = client.messageResponses;
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('The Wise One chat triggers list')
        .setThumbnail('https://i.kym-cdn.com/entries/icons/original/000/042/635/xddtree.png')
        .setTimestamp();
      const commandNames = ['Command\n'];
      const commandDescription = ["Description\n"];

      responseMessages.forEach((value, key) => {
        commandNames.push(`${key}\n`);
        commandDescription.push(`${value.name}\n`);
      });
      embed.addFields(
        { name: '\u200b', value: `${commandNames.join('\n')}`, inline: true },
        { name: '\u200b', value: `${commandDescription.join('\n')}`, inline: true },
      );
      interaction.reply({ embeds: [embed], ephemeral: true });
    }
    catch (e) {
      interaction.reply("something went wrong...");
      console.log(e);
    }
  },
  memberCanExecute(member) {
    return !!member.roles.cache.get(this.roleRequired);
  },
  roleRequired: slashCommandRolePermissions.trusted_role,
};