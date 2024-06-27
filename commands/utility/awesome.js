const { SlashCommandBuilder } = require('discord.js');
const slashCommandRolePermissions = require('../../constants/slashCommandRolePermissions');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('awesome')
		.setDescription('Tell Paul he is AWESOME!'),		
	async execute(interaction) {
		try {
			const theMessage = `Hey Paul-\nThanks so much!\nYOU ARE AWESOME!!! ☺\n\nHave a great weekend.\n\nThank you,\nDonna`
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