const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const slashCommandRolePermissions = require('../../constants/slashCommandRolePermissions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('commands')
    .setDescription('Shows list of triggers available for bot content'),
  async execute(interaction) {
    try {
      // get the client
      const client = interaction.client;
      // get the collection with the messageResponses (bot triggers/replies)
      const responseMessages = client.messageResponses;
      // initialize embed response
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('The Wise One chat commands list')
        .setThumbnail('https://i.kym-cdn.com/entries/icons/original/000/042/635/xddtree.png')
        .setTimestamp();

      // initialize arrays used in the embed response.
      const commandNames = ['Command\n'];
      const commandDescription = ["Description\n"];

      // iterate through the collection to fill in the arrays used in the embed response.
      responseMessages.forEach((value, key) => {
        commandNames.push(`${key}\n`);
        commandDescription.push(`${value.name}\n`);
      });

      // add the fields into the embed.
      embed.addFields(
        { name: '\u200b', value: `${commandNames.join('\n')}`, inline: true },
        { name: '\u200b', value: `${commandDescription.join('\n')}`, inline: true },
      );

      interaction.reply({ embeds: [embed], ephemeral: true });
    }
    catch (e) {
      interaction.reply({ "content": "something went wrong...", ephemeral: true });
      console.log(e);
    }
  },
  memberCanExecute(member) {
    return !!member.roles.cache.get(this.roleRequired);
  },
  roleRequired: slashCommandRolePermissions.trusted_role,
};