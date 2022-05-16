module.exports = {
	debug: false,
	logAllMessages: false,
	database: {
		type: 'mapdb',
		name: 'test',
		number: 1,
	},
	discord: {
		enabled: true,
		discordjsversion: 'latest',
		token: '',
		intents: 32767,
		slashCommandsPublic: true,
		supportServer: '',
		privateServers: [''],
		prefix: '',
		whitelistedBots: [],
		helpEmoji: {
			test: '',
			info: '',
			moderation: '',
		},
		client: {
			name: '',
			avatar: '',
			footer: ''
		},
		beta: {
			type: 'multi',
			name: '',
			avatar: '',
			token: '',
		},
		private: {
			type: 'multi',
			name: '',
			avatar: '',
			token: '',
		},
		premium: {
			type: 'multi',
			name: '',
			avatar: '',
			token: '',
		},
	},
	telegram: {
		enabled: false, // not working for now
	},
	webserver: {
		enabled: false, // not working for now
	},
};