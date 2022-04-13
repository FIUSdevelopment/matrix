const config = require('./config');
const login = require('./bin/discord/login');
client = login(config.discord.intents, config.discord.token);

// console.log(client)