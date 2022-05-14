const { Client, Collection } = require('discord.js');

module.exports = async (client) => {
    if (client.config.discord.enabled) {
        client.commands = new Collection();
        client.aliases = new Collection();
        client.cooldowns = new Collection();
        client.slashCommands = new Collection();
        
        if (client.config.debug) {
            console.log('[Debug] Discord index online')
        }
        
        require('./handler/index')(client);
    }
}