const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'kick',
	description: 'Kick a user',
    beta: true,
    premium: false,
    private: false,
	userPermissions: ['KICK_MEMBERS'],
    botPermissions: ['KICK_MEMBERS'],
	options: [
		{
			name: 'user',
			description: 'L\'utente da espellere',
			type: 'USER',
			required: true,
		},
		{ 
			name: 'reason',
			description: 'Motivazione',
			type: 'STRING',
			required: false,
		},
	],
	run: async (client, interaction) => {
        var utente = interaction.options.getUser('user');
		var reason = interaction.options.getString('reason') || 'Nessun motivo';

		var member = interaction.guild.members.cache.get(utente.id);
		if (!member?.kickable) {
			return interaction.reply({ content: 'Non posso kickare questo utente', ephemeral: true });
		}

		member.kick();

        const embed = new MessageEmbed()
			.setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
			.setTitle('Member kicked with success!')
			.setDescription(`**${utente}** was kicked from ${interaction.user.tag} for the reason: \`${reason}\`.`)
			.setFooter({ text: 'By FIUS Development', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
			.setColor('RED');

		interaction.reply({ embeds: [embed] });
    },
};