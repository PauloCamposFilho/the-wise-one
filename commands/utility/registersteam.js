const { SlashCommandBuilder } = require('discord.js');
const { registerSteam } = require('../../config/db/controllers/UserController');
const slashCommandRolePermissions = require('../../constants/slashCommandRolePermissions');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('registersteam')
		.setDescription('register a steam id # with your discord account on this server.')
		.addStringOption(option => option.setName('steamid')
			.setDescription('Enter your steam ID')
			.setRequired(true)),
	async execute(interaction) {
		try {
			const member = interaction.member;
			const userId = member.id;
			const steamId = String(interaction.options.getString('steamid'));

			// Validate steamId using a regular expression
			const isNumeric = /^\d+$/.test(steamId);
			if (!isNumeric) return await interaction.reply({ content: 'Please provide a valid SteamId', ephemeral: true });

			const result = await registerSteam(userId, steamId);
			console.log(result);
			await interaction.reply({ content: `Thank you, sapling. Steam ID: ${steamId}`, ephemeral: true });
		}
		catch (e) {
			await interaction.reply({ content: 'There was a problem with your request. Try again later.', ephemeral: true });
		}
	},
	memberCanExecute(member) {
		return !!member.roles.cache.get(this.roleRequired);
	},
	roleRequired: slashCommandRolePermissions.trusted_role,
};