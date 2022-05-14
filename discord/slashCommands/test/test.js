module.exports = {
	name: 'test',
	description: 'test',
    beta: false,
    premium: false,
    private: false,
	options: [
		{
			name: 'message',
			description: 'message',
			type: 'STRING',
			required: true,
		},
	],
	run: async (client, interaction) => {
        interaction.reply('Test eseguito correttamente')
    },
};