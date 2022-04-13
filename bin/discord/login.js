const discord = require('discord.js');
const config = require('../../config.js');

module.exports = async function (intents, token) {
    const client = new discord.Client ({intents});
    client.login(token);

    console.log(`Logged in!`)

    return client;
}