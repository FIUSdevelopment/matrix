module.exports = async function () {
    const config = require('../../config');
    const login = require('../../bin/discord/login');
    const client = login(config.discord.intents, config.discord.token);
    return client;
}