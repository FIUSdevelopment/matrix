module.exports = async (client) => {
    client.on('guildCreate', async (guild) => {
        client.channels.cache.get(client.config.discord.logsChannel).send(`Sono stato aggiunto a ${guild.name} (${guild.id})`)
    })
}