const { Events } = require('discord.js');
const handleMessageResponse = require('../helpers/handleMessageResponse');
const theWiseTreeUserId = process.env.CLIENT_ID;
const botRepliesOnlyToTrusted = Boolean(process.env.BOT_REPLIES_ONLY_TO_TRUSTED);
const slashCommandRolePermissions = require('../constants/slashCommandRolePermissions');

module.exports = {
  name: Events.MessageCreate,
  async execute(msg) {
    try {
      const client = msg.client;
      const member = msg.member;
      const isTrustedMember = !!member && !!member.roles?.cache.get(slashCommandRolePermissions.trusted_role) || false;
      const messageResponse = await (client.messageResponses.get(msg.content));
      const botCanTrigger = messageResponse?.botCanTrigger || false;

      // message does not trigger a bot response.
      if (!messageResponse) return;
      // if bot is set to only respond to trusted members, don't respond to untrusted.
      if (botRepliesOnlyToTrusted && !isTrustedMember) return;
      // do not respond.
      if (msg.author.id === theWiseTreeUserId && !botCanTrigger) return;

      handleMessageResponse(msg, messageResponse);
    }
    catch (e) {
      console.error(e);
    }
  },
};