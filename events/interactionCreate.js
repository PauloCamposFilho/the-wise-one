const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    const command = {
      name: undefined,
      data: undefined,
      hasRoleRequirement: false,
      execution: undefined,
      responseHandler: undefined,
    };
    if (interaction.isChatInputCommand()) {
      command.name = interaction.commandName;
      command.data = interaction.client.commands.get(command.name);
      command.hasRoleRequirement = 'memberCanExecute' in command.data;
    }
    if (interaction.isButton()) {
      command.name = interaction.commandName;
      command.data = interaction.client.commands.get(command.name);
      command.hasRoleRequirement = 'memberCanExecute' in command.data;
      command.responseHandler = command.data.responseHandler;
    }
    if (interaction.isUserContextMenuCommand()) {
      command.name = interaction.commandName;
      command.data = interaction.client.commands.get(command.name);
      command.hasRoleRequirement = 'memberCanExecute' in command;
    }

    // handle the interaction
    if (!command.data) {
      return console.error(`No command matching ${interaction.commandName} was found.`);
    }
    if (command.hasRoleRequirement && !command.data.memberCanExecute(interaction.member)) {
      return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }
    try {
      if (command.responseHandler) return command.responseHandler(interaction);
      command.data.execute(interaction);
    } catch (e) {
      console.error(`Error executing ${command.name}`);
      console.error(e);
    }
  },
};