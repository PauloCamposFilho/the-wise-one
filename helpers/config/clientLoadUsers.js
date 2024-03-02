const clientLoadUsers = async (client) => {
  try {
    const guilds = client.guilds.cache;
    for (const guild of guilds) {
      await client.guilds.cache.get(guild[0]).members.fetch();
    }
    console.log(`Loaded a total of ${client.guilds.cache.size} guilds and ${client.users.cache.size} users`);
  }
  catch (e) {
    console.log(e);
  }
};

module.exports = clientLoadUsers;