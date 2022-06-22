module.exports = {
	name: 'slashCommandExample',
	description: 'this is an example',
	beta: false,
	premium: false,
	private: false,
	userPermissions: ['ADMINISTRATOR'],
	botPermissions: ['MANAGE_MESSAGE'],
	options: [
		{
			name: 'example',
			description: 'This is an example',
			type: 'STRING',
			required: false,
		},
	],
	run: async (client, interaction) => {
		var language = await client.getLanguage(client, interaction.guild.id);
		var translations = await client.getTranslations(language, 'slashCommands','commandCategory', 'commandName')
	},
};