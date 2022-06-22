module.exports = {
    name: 'server-list',
    aliases: ['serverlist'],
    description: 'Check what Servers the bot is in!',
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
        let data = [];
        let array = [];
        let arraid = [];
        client.guilds.cache.forEach((x) => {
            if (!arraid.includes(x.id)) {
                array.push(x)
                arraid.push(x.id)
            } else {
                return
            }
        })
        client.version.beta.guilds.cache.forEach((x) => {
            if (!arraid.includes(x.id)) {
                array.push(x)
                arraid.push(x.id)
            } else {
                return
            }
        })
        client.version.private.guilds.cache.forEach((x) => {
            if (!arraid.includes(x.id)) {
                array.push(x)
                arraid.push(x.id)
            } else {
                return
            }
        })
        client.version.premium.guilds.cache.forEach((x) => {
            if (!arraid.includes(x.id)) {
                array.push(x)
                arraid.push(x.id)
            } else {
                return
            }
        })

        array.forEach((x) => {
          message.channel.send(
            `🔹**${x.name}** | \`${x.memberCount}\` members (ID: ${x.id})\n............................`
          );
        });
  
        if (data.length > 0) {
          data.sort();
          data = `🔹 ` + data.join("\n🔹");
        } else {
          data = "[No server found]";
        }
    },
}