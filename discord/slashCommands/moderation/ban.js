const { MessageEmbed } = require('discord.js')
module.exports = {
	name: 'ban',
	description: 'Ban specified user from your server',
    beta: false,
    premium: false,
    private: false,
	options: [
        {
            name: 'user',
            description: 'user to ban',
            type: 'USER',
            required: true,
        },
        {
            name: 'reason',
            description: 'reason of the ban',
            type: 'STRING',
            required: false,
        },
	],
	run: async (client, interaction) => {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
			return interaction.reply({ content: 'You are not allowed', ephemeral: true });
		}

		var utente = interaction.options.getUser('user');
		var reason = interaction.options.getString('reason') || 'No reason';

		var member = interaction.guild.members.cache.get(utente.id);


		if (!member?.bannable) {
			return interaction.reply({ content: 'I can\'t ban this user', ephemeral: true });
		}

        interaction.guild.bans.create(member, { reason: `${reason} | ${interaction.member.user.tag}` });

        
        const embed = new MessageEmbed()
			.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
			.setTitle('User successfully banned!')
			.setDescription(`**${member.tag}** was banned from ${interaction.user.tag} for the reason: \`${reason}\`.`)
			.setFooter({ text: client.config.discord.client.footer, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
			.setColor('RED');
		return interaction.reply({ embeds: [embed] });
    },
};