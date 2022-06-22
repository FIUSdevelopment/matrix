const { MessageEmbed } = require('discord.js');
const exec = require('child_process').exec;
module.exports = {
    name: 'eval',
    aliases: [],
    description: 'Evaluate a given code!',
    usage: '<code>',
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
        try {
            const code = args.join(" ");
            if (!code) {
               return message.channel.send("Please Provide A code to eval!");
            }
            let evaled = eval(code);
   
            if (typeof evaled !== "string")
               evaled = require("util").inspect(evaled);
   
            let embed = new MessageEmbed()
               .setAuthor("Eval", message.author.avatarURL())
               .addField("Input", `\`\`\`${code}\`\`\``)
               .addField("Output", `\`\`\`${evaled}\`\`\``)
               .setColor("BLUE");
   
            message.channel.send({ embeds: [embed] });
            console.log(`Eval executed:\nOutput:\n${evaled}\n\nInput\n${code}`)
         } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
            console.log(`Eval executed:\nERROR\n${err}s`)
         }
    },
}