const User = require('../../schemas/User');

exports.registerSteam = async (userId, steamId) => {
  try {
    const user = await User.findOne({ id: userId });

    // If user already exists, update and done.
    if (user) {
      user.steamId = steamId;
      user.save();
      return { success: true, message: 'Your steamId was updated successfully' };
    }

    // Otherwise, create new user
    const newUser = new User({
      id: userId,
      steamId,
    });

    newUser.save();
    return { success: true, message: 'Your steamId was added successfully' };
  }
  catch (e) {
    return { success: false, message: `There was a problem with your request: ${e}` };
  }
};

exports.getUserInfo = async (userId) => {
  try {
    if (userId) return await User.findOne({ id: userId });
    return await User.find({});
  }
  catch (e) {
    throw new Error();
  }
};