const userIdCheck = process.env.FRENCHY_ID;

/**
 * Takes a userId and a timeout chance and returns true/false on whether to time them out.
 * @param {String} userId
 * @param {Number} timeoutChance
 * @returns Boolean
 */
const randomTimeoutCheck = (userId, timeoutChance = 10) => {
  // timeoutChance = timeoutChance || 10; // default 10%.
  const willTimeout = Math.floor(Math.random() * 100) < timeoutChance;
  if (userId === userIdCheck && willTimeout) return true;
  return false;
};
module.exports = randomTimeoutCheck;