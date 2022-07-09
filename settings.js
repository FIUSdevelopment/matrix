module.exports = {
	debug: false,
	logAllMessages: false,
	database: {		
		type: 'mapdb',// mapdb / mongodb 
		name: 'test',
		number: 1,
		connectionURL: '' //only if type = mongodb
	},
	discord: {
		enabled: false,
		discordjsversion: 'latest',
		token: '',
		intents: 32767,
		slashCommandsPublic: true,
		supportServer: '',
		privateServers: [''],
		prefix: '',
		whitelistedBots: [],
		developers: [''],
		helpEmoji: {
			test: ''
		},
		client: {
			name: '',
			avatar: '',
			footer: ''
		},
		beta: {
			type: 'multi', // multi / mono
			name: '',
			avatar: '',
			token: '',
		},
		private: {
			type: 'multi', // multi / mono
			name: '',
			avatar: '',
			token: '',
		},
		premium: {
			type: 'multi', // multi / mono
			name: '',
			avatar: '',
			token: '',
		},
	},
	telegram: {
		enabled: false,
	},
	webserver: {
		enabled: false,
		port: 8000, // Port
	},
};