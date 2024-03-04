const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const slashCommandRolePermissions = require('../../constants/slashCommandRolePermissions');
const { getUserInfo } = require('../../config/db/controllers/UserController');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('steaminfo')
		.setDescription('Shows information of all users that registered a steamId'),
	async execute(interaction) {
		try {

			const users = await getUserInfo();

			// Initialize the embed
			const embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle('Steam ID Registry for The Woods')
				.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png')
				.setTimestamp();


			// Initialize arrays with starter values for styling the embed.
			const nicknames = ['Username\n'];
			const steamIds = ['SteamId\n'];

			// Loop through user array and fill the other two arrays with stylized text content.
			for (let i = 0; i < users.length; i++) {
				const member = interaction.member.guild.members.cache.get(users[i].id);
				const nickname = member.nickname || member.user.globalName;
				nicknames.push(i % 2 === 0 ? `**${nickname}**` : nickname);
				steamIds.push(i % 2 === 0 ? `**${users[i].steamId}**` : `${users[i].steamId}`);
			}

			// Add the fields with the content of the two arrays
			embed.addFields(
				{ name: '\u200b', value: `${nicknames.join('\n')}`, inline: true },
				{ name: '\u200b', value: `${steamIds.join('\n')}`, inline: true },
			);

			await interaction.reply({ embeds: [embed], ephemeral: true });
		}
		catch (e) {
			await interaction.reply({ content: `There was a problem...${e}`, ephemeral: true });
			console.log(e);
		}
	},
	memberCanExecute(member) {
		return !!member.roles.cache.get(this.roleRequired);
	},
	roleRequired: slashCommandRolePermissions.trusted_role,
};