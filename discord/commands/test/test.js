module.exports = {
    name: 'test',
    aliases: [],
    description: 'This is only a test',
    usage: '',
    toggleOff: false,
    developersOnly: false,
    private: false,
    beta: false,
    premium: false,
    userPermissions: [],
    botPermissions: [],
    cooldowns: 0, // number or false
    version: 1,

    run: async (client, message, args) => {
        message.channel.send('Test eseguito correttamente')
    },
}