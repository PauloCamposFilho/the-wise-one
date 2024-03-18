const { Events } = require('discord.js');
const randomTimeoutCheck = require('../helpers/randomTimeoutCheck');
const theWiseTreeUserId = process.env.CLIENT_ID;
const userIdCheck = process.env.FRENCHY_ID;

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(messageReaction, user) {
    try {
      const client = messageReaction.client;
      // fetch the full message if we got a partial.
      if (messageReaction.partial) await messageReaction.fetch();
      const channel = client.channels.cache.get(messageReaction.message.channel.id);
      const guild = client.guilds.cache.get(messageReaction.message.guildId);
      const reactor = guild.members.cache.get(user.id);

      // Handle anyone reacting with a "recycle" to the bot
      if (messageReaction.emoji.name === '♻️' && messageReaction.message.author.id === theWiseTreeUserId) {
        try {
          messageReaction.users.remove(user);
          await reactor.timeout(10_000);
          await channel.send({ content: `You would mock the spirit of The Woods, ${reactor.nickname}?` });
          await channel.send({ content: 'Be with us for a while.' });
        }
        catch (error) {
          if (error?.rawError?.message === 'Missing Permissions') return console.log('Couldn\'t time out the user. Bot is same or lower role than user.');
          console.log(error);
        }
      }

      // Handle frenchy reacting with anything to the bot.
      if (messageReaction.message.author.id === theWiseTreeUserId && user.id === userIdCheck && randomTimeoutCheck(messageReaction.message.author.id, 33)) {
        await channel.send({ content: `We wont be hearing from ${reactor.nickname} for a while...` });
        reactor.timeout(60_000);
        messageReaction.users.remove(user);
      }
    }
    catch (e) {
      console.error(e);
    }
  },
};