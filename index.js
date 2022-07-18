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
	if (config.webserver.enabled) {
		require('./webserver/index.js') (config)
	}
	return client;
}
var client = start()
module.exports = client;