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
		token: 'OTIwNjUxNDQ5ODI5MDU2NTYy.Ybndeg.2lpULhwLgBaT19KgZ0Av0ftlNlI',
		intents: 32767,
		slashCommandsPublic: true,
		supportServer: '831267653929795604',
		privateServers: ['831267653929795604'],
		prefix: 'mr.',
		whitelistedBots: [],
		helpEmoji: {
			test: '',
			info: '',
			moderation: '',
		},
		client: {
			name: 'MR.Handy',
			avatar: 'https://cdn.discordapp.com/avatars/920651449829056562/2bb9fb5c7728741eff27ef96162adddd.webp',
			footer: 'By FIUS Dev'
		},
		beta: {
			type: 'multi',
			name: 'MR.Handy BETA',
			avatar: 'https://cdn.discordapp.com/avatars/920651449829056562/2bb9fb5c7728741eff27ef96162adddd.webp',
			token: 'ODkwMjg2NzMzMTE0MDkzNTg4.YUtmIQ.XxTJRDrDXJXUXYPQnlu2cqTkC84',
		},
		private: {
			type: 'multi',
			name: 'MR.Handy PRIVATO',
			avatar: 'https://cdn.discordapp.com/avatars/920651449829056562/2bb9fb5c7728741eff27ef96162adddd.webp',
			token: 'ODkyMDQ2OTY1MjgwNDg5NTMz.Gw63tC.S4-e_Oga9_LIquI_ojoB68tOqqTtfcOJE1Se9k',
		},
		premium: {
			type: 'multi',
			name: 'MR.Handy PREMIUM',
			avatar: 'https://cdn.discordapp.com/avatars/920651449829056562/2bb9fb5c7728741eff27ef96162adddd.webp',
			token: 'ODkyMDQ2NTEzNzcyMDQ0Mzk4.GyVA9s._kQ9Ihwjl62D4A1LkCVKVxx6Ps98NQMTTL_UWY',
		},
	},
	telegram: {
		enabled: false,
	},
	webserver: {
		enabled: false,
	},
};