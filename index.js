require('dotenv').config();
const BOT_TOKEN = process.env.BOT_TOKEN;
const { client } = require('./config/client');
const { dbStart } = require('./config/db/db');

dbStart();
client.login(BOT_TOKEN);