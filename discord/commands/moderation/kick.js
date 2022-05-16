const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'kick',
    aliases: [],
    description: 'Kick a member',
    usage: '<@user/id>',
    toggleOff: false,
    developersOnly: false,
    private: false,
    beta: true,
    premium: false,
    userPermissions: ['KICK_MEMBERS'],
    botPermissions: ['KICK_MEMBERS'],
    cooldowns: 0, // number or false
    version: 1,

    run: async (client, message, args) => {
        let member;
		if (!message.mentions.members.first()) {
			if (!args[0]) {
				const embed = new MessageEmbed()
					.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
					.setTitle('Error!')
					.setDescription('You haven\'t mentioned any user or written its id.')
					.setFooter({ text: 'By FIUS Development', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
					.setColor('RED');
				return message.reply({ embeds: [embed] });
			} else {
				if (!message.guild.members.cache.has(args[0])) {
					const embed = new MessageEmbed()
						.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
						.setTitle('Error!')
						.setDescription('This user was not found. Write the name or id correctly.')
						.setFooter({ text: 'By FIUS Development', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
						.setColor('RED');
					return message.reply({ embeds: [embed] });
				} else if (message.guild.members.cache.has(args[0])) {
					member = message.guild.members.cache.get(args[0]);
				}
			}
		} else {
			member = message.mentions.members.first();
		}
		let reason = 'No reason.';
		if (args[1]) reason = args.slice(1).join(' ');
		member.kick(reason);
		const embed = new MessageEmbed()
			.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
			.setTitle('Member kicked with success!')
			.setDescription(`**${member}** was kicked from ${message.author.tag} for the reason: \`${reason}\`.`)
			.setFooter({ text: 'By FIUS Development', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
			.setColor('RED');
		message.reply({ embeds: [embed] });
    },
}