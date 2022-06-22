module.exports = {
    name: 'logalldb',
    aliases: [],
    description: 'Log all the database',
    usage: '',
    icon: '',
    toggleOff: false,
    developersOnly: true,
    private: false,
    beta: false,
    premium: false,
    userPermissions: [],
    botPermissions: [],
    cooldowns: 0, // number or false
    version: 1,

    run: async (client, message, args) => {
        var fetch1 = await client.db.guilds.all()
        var fetch2 = await client.db.users.all()

        console.log(`${fetch1}\n\n\n\n${fetch2}`)
        message.reply('Done!')
    },
}
