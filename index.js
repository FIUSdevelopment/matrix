async function start() {
	// Error Handling

	const { catchError } = require('./utils/catchError');

	process.on('unhandledRejection', (err, origin) => {
		catchError('Unhandled Rejection/Catch', err, origin);
	});
	process.on('uncaughtException', (err, origin) => {
		catchError('Uncaught Exception/Catch', err, origin);
	});
	process.on('multipleResolves', (type, promise, reason) => {
		catchError('Multiple Resolves', type, promise, reason);
	});

	// Requirements
	const Discord = require('discord.js');
	const { getConfig } = require('./utils/getConfig.js');
	const config = await getConfig()
	var client = { config };
	const chalk = require('chalk');
	const MapDB = require('quickmap.db');

	if (config.debug) console.log('[Debug] Warning: Command Handler Debug Mode Enabled');
	/*
	switch (config.database.name) {
	case 'mapdb':
		if (config.database.number == 1) {
			client.db = new MapDB(config.database.name);
		} else {
			client.db = { guilds: {}, users: {}};
			client.db.guilds = new MapDB('guilds.json');
			client.db.users = new MapDB('users.json');
			client.db.economy = new MapDB('economy.json');
		}
		break;
	}*/
	const dbconntect = require('./utils/databaseConntect');
	// client.db = dbconntect(client)


	client.package = [];
	client.package.db = require('quickmap.db');

	//const languages = new Collection();
	//fs.readdirSync('./languages').filter(file => file.endsWith('.js')).map(language => require(`../languages/${language}`)).forEach(language => languages.set(language.name, language.translation));
	//client.trSelect = (language) => languages.get(language);

	if (config.discord.enabled) {
		client.dsclient = new Discord.Client({ intents: config.discord.intents });
		client.dsclient.login(config.discord.token);

		if (config.discord.beta.type == 'multi') {
			if (!client.dsclient.version) client.dsclient.version = [];
			client.dsclient.version.beta = new Discord.Client({ intents: config.discord.intents });
			client.dsclient.version.beta.login(config.discord.beta.token);
		}

		if (config.discord.premium.type == 'multi') {
			if (!client.dsclient.version) client.dsclient.version = [];
			client.dsclient.version.premium = new Discord.Client({ intents: config.discord.intents });
			client.dsclient.version.premium.login(config.discord.premium.token);
		}

		if (config.discord.private.type == 'multi') {
			if (!client.dsclient.version) client.dsclient.version = [];
			client.dsclient.version.private = new Discord.Client({ intents: config.discord.intents });
			client.dsclient.version.private.login(config.discord.private.token);
		}

		client.dsclient.config = client.config;
		client.dsclient.db = client.db;
		client.dsclient.language = require('./language/languages');
		var { getTranslations, getLanguage } = require('./utils/translations');
		client.dsclient.getTranslations = getTranslations;
		client.dsclient.getLanguage = getLanguage;
		require('./discord/index')(client.dsclient);
	}
	return client;
}
var client = start()
module.exports = client;