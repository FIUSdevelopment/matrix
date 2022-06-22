module.exports = async (client) => {
    client.on('guildDelete', async (guild) => {
        client.channels.cache.get(client.config.discord.logsChannel).send(`Sono stato rimosso da ${guild.name} (${guild.id})`)
    })
}