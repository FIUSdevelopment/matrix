module.exports = {
    name: 'timeout',
    aliases: ['mute'],
    description: 'Mute a member',
    usage: '<@user/id>',
    toggleOff: false,
    developersOnly: false,
    private: false,
    beta: true,
    premium: false,
    userPermissions: [],
    botPermissions: [],
    cooldowns: 0, // number or false
    version: 1,

    run: async (client, message, args) => {
        let member;
		if (!message.mentions.members.first()) {
			if (!args[0]) {
				const embed = new Discord.MessageEmbed()
					.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
					.setTitle('Error!')
					.setDescription('You haven\'t mentioned any user or written its id.')
					.setFooter({ text: 'By FIUS Development', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
					.setColor('RED');
				return message.reply({ embeds: [embed] });
			} else {
				if (!message.guild.members.cache.has(args[0])) {
					const embed = new Discord.MessageEmbed()
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
		if (String(parseInt(args[1])) !== args[1] || !parseInt(args[1]) <= 0 || !args[1]) {
			const embed = new Discord.MessageEmbed()
				.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
				.setTitle('Error!')
				.setDescription('Timeout duration must be valid, expressed in seconds and greater than `0`.')
				.setFooter({ text: 'By FIUS Development', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
				.setColor('RED');
		}
		let reason = 'No reason.';
		if (args[2]) reason = args.slice(1).join(' ');
		member.timeout(parseInt(args[1]) * 1000, reason);
		const embed = new Discord.MessageEmbed()
			.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
			.setTitle('Member timed out with success!')
			.setDescription(`**${member.user.tag}** was timed out from ${message.author.tag} for the reason: \`${reason}\``)
			.setFooter({ text: 'By FIUS Development', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
			.setColor('RED');
		message.reply({ embeds: [embed] });
    },
}