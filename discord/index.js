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

        // -------------------Database-------------------
        client.db = []
        if (client.config.database.type == 'discortics.db' || client.config.database.type == 'mongodb' || client.config.database.type == 'mongo' || client.config.database.type == 'mongose') {
            const db = require('discortics.db');
            await db.connect(client.config.database.connectionURL);
            client.db.users = await new db.table('users');
            client.db.guilds = await new db.table('guilds');

            // https://npmjs.com/package/discortics.db
        } else if (client.config.database.type == 'quickmap.db' || client.config.database.type == 'map.db') {
            const db = require('discortics.db');
            client.db.users = await new db.table('users');
            client.db.guilds = await new db.table('guilds');
        }

        require('./handler/index')(client);
    }
}
