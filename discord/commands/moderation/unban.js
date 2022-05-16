const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'unban',
    aliases: ['pardon'],
    description: 'Unban a member',
    usage: '<id>',
    toggleOff: false,
    developersOnly: false,
    private: false,
    beta: true,
    premium: false,
    userPermissions: ['BAN_MEMBERS'],
    botPermissions: ['BAN_MEMBERS'],
    cooldowns: 0, // number or false
    version: 1,

    run: async (client, message, args) => {
        let member;
		if (!args[0]) {
			const embed = new MessageEmbed()
				.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
				.setTitle('Error!')
				.setDescription('You haven\'t mentioned any user or written its id.')
				.setFooter({ text: client.config.discord.client.footer, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
				.setColor('#fedcba');
			return message.reply({ embeds: [embed] });
		}
		member = args[0];
		let reason = 'No reason.';
		if (args[1]) reason = args.slice(1).join(' ');
		message.guild.bans.remove(member, { reason });
		member = client.users.cache.find(user => user.id === member);
		const embed = new MessageEmbed()
			.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
			.setTitle('User successfully unbanned!')
			.setDescription(`**${member}** was unbanned from ${message.author.tag} for the reason: \`${reason}\`.`)
			.setFooter({ text: client.config.discord.client.footer, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
			.setColor('#fedcba');
		message.reply({ embeds: [embed] });
    },
}
