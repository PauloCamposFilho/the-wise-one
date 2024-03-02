const { SlashCommandBuilder } = require('discord.js');
const EMOTES = require('../../constants/emotes');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('greet')
		.setDescription('The Wise One greets his children.'),
	async execute(interaction) {
		await interaction.reply('Welcome, my children');
		await interaction.followUp(EMOTES.xddTree);
	},
};