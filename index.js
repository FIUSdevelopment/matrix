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
const config = require('./config');
const client = { config };
const chalk = require('chalk');
const MapDB = require('quickmap.db');

if (config.debug) console.log('[Debug] Warning: Command Handler Debug Mode Enabled');

switch (config.database.name) {
case 'mapdb':
	if (config.database.number == 1) {
		client.db = new MapDB(config.database.name);
	} else {
		client.db = {};
	}
	break;
}

client.package = [];
client.package.db = require('quickmap.db');
client.db = new MapDB(config.database.name);

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
	require('./discord/index')(client.dsclient);
}

module.exports = client;