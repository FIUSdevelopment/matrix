module.exports = {
    name: 'shutdown',
    aliases: [],
    description: '',
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
        message.channel.send("Shutting down...").then((m) => {
            client.destroy();
            client.version.beta.destroy();
            client.version.premium.destroy();
            client.version.private.destroy();
        });
    },
}