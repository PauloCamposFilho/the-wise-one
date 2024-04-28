const { ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder } = require('discord.js');
const { getUserInfo } = require('../../config/db/controllers/UserController');
const slashCommandRolePermissions = require('../../constants/slashCommandRolePermissions');

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName('Get Steam Info')
    .setType(ApplicationCommandType.User),
  async execute(interaction) {
    try {
      const user = await getUserInfo(interaction.targetId);
      // check if user has steamId registered, if not, we can stop there.
      if (!user) return await interaction.reply({ content: `It doesn't look like the user has a SteamId registered here...`, ephemeral: true });
      const targetMember = interaction.member.guild.members.cache.get(interaction.targetId);
      const userAvatar = targetMember.displayAvatarURL();

      // Initialize the embed response
      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`${targetMember.nickname}'s Steam ID`)
        .setThumbnail(userAvatar)
        .setTimestamp();

      // Add fields to embed
      embed.addFields(
        { name: '\u200b', value: user.steamId }
      );

      await interaction.reply({ embeds: [embed], ephemeral: true });

    } catch (error) {
      await interaction.reply({ content: `There was a problem... ${error}`, ephemeral: true });
      console.log(error);
    }
  },
  memberCanExecute(member) {
    return !!member.roles.cache.get(this.roleRequired);
  },
  roleRequired: slashCommandRolePermissions.trusted_role
};