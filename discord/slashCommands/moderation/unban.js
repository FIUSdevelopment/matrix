module.exports = {
	name: 'unban',
	description: 'Unban a user by id',
    beta: true,
    premium: false,
    private: false,
	options: [
		{
			name: 'id',
			description: 'User id',
			type: 'STRING',
			required: true,
		},
	],
	run: async (client, interaction) => {
        var utente = interaction.options.getString('id');
        var member = interaction.guild.members.cache.get(utente);

        interaction.guild.bans.remove(member, { reason: interaction.user.tag })

        const embed = new MessageEmbed()
        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTitle('User successfully unbanned!')
        .setDescription(`**${member.tag}** was banned from ${interaction.user.tag}.`)
        .setFooter({ text: client.config.discord.client.footer, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setColor('RED');
        return interaction.reply({ embeds: [embed] });
    },
};