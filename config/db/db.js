const mongoose = require('mongoose');
const uri = process.env.MONGODB_CONNECTIONSTRING;

//const db = mongoose.connection;
const dbStart = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error(`Error connecting to MongoDB: ${e}`);
  }
};
module.exports = { dbStart };