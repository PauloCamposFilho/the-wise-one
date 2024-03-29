const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {

      const command = interaction.client.commands.get(interaction.commandName);
      const commandHasRoleRequirement = 'memberCanExecute' in command;

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      if (commandHasRoleRequirement && !command.memberCanExecute(interaction.member)) {
        return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
      }

      try {
        await command.execute(interaction);
      }
      catch (e) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(e);
      }
    }
    // ButtonInteraction Class
    if (interaction.isButton()) {
      const commandName = interaction.message.interaction.commandName;
      const commandButton = interaction.client.commands.get(commandName);
      commandButton.responseHandler(interaction);
    }
  },
};