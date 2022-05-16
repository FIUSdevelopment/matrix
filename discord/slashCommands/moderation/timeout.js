module.exports = {
	name: 'timeout',
	description: 'Timeout a member',
    beta: true,
    premium: false,
    private: false,
	userPermissions: ['MODERATE_MEMBERS'],
    botPermissions: ['MODERATE_MEMBERS'],
	options: [
        {
            name: 'user',
            description: 'member to perform the timeout on',
            type: 'USER',
            required: true
        },
        {
            name: 'duration',
            description: 'duration of timeout',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: "60 SEC",
                    value: "60 SEC"
                },
                {
                   name: "5 MIN",
                   value: "5 MIN"
               },
               {
                   name: "10 MIN",
                   value: "10 MIN"
               },
               {
                   name: "1 HOUR",
                   value: "1 HOUR"
               },
               {
                   name: "1 DAY",
                   value: "1 DAY"
               },
               {
                   name: "1 WEEK",
                   value: "1 WEEK"
               },
               {
                   name: "remove",
                   value: "1 SEC"
               }
            ]
        },
        {
            name: 'reason',
            description: 'reason for this timeout',
            type: 'STRING',
            required: false,
        },
	],
	run: async (client, interaction) => {

        const user = interaction.options.getUser("user")
        const lenght = interaction.options.getString("duration") 
        const reason = interaction.options.getString("reason") || "no reason"
        const member = interaction.guild.members.cache.get(user.id)
    
     
        const timeInMs = ms(lenght);
       
        member.timeout(timeInMs, reason)
        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTitle('Member timed out with success!')
            .setDescription(`**${member.tag}** was timed out from ${interaction.user.tag} (${lenght}) for the reason: \`${reason}\``)
            .setFooter({ text: 'By FIUS Development', iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setColor('RED');
        interaction.reply({ embeds: [embed] });
    },
};