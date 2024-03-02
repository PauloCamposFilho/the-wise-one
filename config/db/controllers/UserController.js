const User = require('../../schemas/User');

exports.registerSteam = async (userId, steamId) => {
  try {
    const user = await User.findOne({ id: userId });

    // If user already exists, update and done.
    if (user) {
      user.steamId = steamId;
      user.save();
      return { success: true, message: `Your steamId was updated successfully` };
    }

    // Otherwise, create new user
    const newUser = new User({
      id: userId,
      steamId
    });

    newUser.save();
    return { success: true, message: `Your steamId was added successfully` };
  } catch (e) {
    return { success: false, message: `There was a problem with your request: ${e}` };
  }
};

exports.getUserInfo = async (userId) => {
  try {
    const user = await User.findOne({ id: userId });
    return user;
  } catch (e) {
    throw new Error();
  }
};

exports.getAllUserInfo = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (e) {
    throw new Error();
  }
};