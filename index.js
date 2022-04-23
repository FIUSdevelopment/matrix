const config = require('./config');
const discord = require('./src/discord/index');

if (config.discord.enabled) {
    var dsclient = discord();
    require("./src/discord/handler/events")(dsclient);
}

module.exports = dsclient;