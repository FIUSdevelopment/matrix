module.exports = async (client) => {
	if (client.config.debug) {
		console.log('[Debug] Discord event "ready" online');
	};
	const { discord } = require('../../config');
	const prefix = discord.prefix;
	const chalk = require('chalk');
	const { version: discordjsVersion } = require('discord.js');
	client.on('ready', async () => {
		if (client.config.debug) {
			console.log('[Debug] Discord event "ready" has been invoked');
			client.user.setActivity('Debug Mode', { type: 'WATCHING' });

		} else {
			const supportServer = discord.supportServer;
			const supportServerID = client.guilds.cache.get(supportServer);
			if (!supportServerID) console.log('');
			// ———————————————[Status]———————————————
			client.user.setActivity(`${prefix}help || ${client.guilds.cache.size} ${client.guilds.cache.size > 1 ? 'Servers' : 'Server'}`, { type: 'WATCHING' });
			// ———————————————[Ready MSG]———————————————
			// console.log(chalk.green.bold('Success!'));
			console.log(chalk.gray('Connected To'), chalk.yellow(`${client.user.tag}`));
			console.log(
				chalk.white('Watching'),
				chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
				chalk.white(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? 'Users,' : 'User,'}`),
				chalk.red(`${client.guilds.cache.size}`),
				chalk.white(`${client.guilds.cache.size > 1 ? 'Servers.' : 'Server.'}`),
			);
			console.log(
				chalk.white('Prefix:'),
				chalk.red(prefix),
				chalk.white('||'),
				chalk.red(`${client.commands.size}`),
				chalk.white('Commands'),
			);
			console.log(
				chalk.white('Support-Server: ') +
				chalk.red(`${supportServerID.name || 'None'}`),
			);
			console.log('');
			console.log(chalk.red.bold('——————————[Statistics]——————————'));
			var package = require('../../package.json');
			console.log(
				chalk.gray(`Discord.js Version: ${discordjsVersion}\nRunning on Node ${process.version} on ${process.platform} ${process.arch}\nBot Version: ${package.version}`),
			);
			console.log(
				chalk.gray(`Memory: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`),
			);
			console.log('Bot started');
	
		}
	});
	if (client.config.discord.beta.type == 'multi') {
		client.version.beta.on('ready', async () => {
			// ———————————————[Ready MSG]———————————————
			console.log(chalk.gray('Connected To'), chalk.yellow(`${client.version.beta.user.tag} (beta)`));
			// ———————————————[Status]———————————————
			client.version.beta.user.setActivity(`${prefix}help || ${client.version.beta.guilds.cache.size} ${client.version.beta.guilds.cache.size > 1 ? 'Servers' : 'Server'}`, { type: 'WATCHING' });
		});
	}
	if (client.config.discord.premium.type == 'multi') {
		client.version.premium.on('ready', async () => {
			// ———————————————[Ready MSG]———————————————
			console.log(chalk.gray('Connected To'), chalk.yellow(`${client.version.premium.user.tag} (premium)`));
			// ———————————————[Status]———————————————
			client.version.premium.user.setActivity(`${prefix}help || ${client.version.premium.guilds.cache.size} ${client.version.premium.guilds.cache.size > 1 ? 'Servers' : 'Server'}`, { type: 'WATCHING' });
		});
	}
	if (client.config.discord.private.type == 'multi') {
		client.version.private.on('ready', async () => {
			// ———————————————[Ready MSG]———————————————
			console.log(chalk.gray('Connected To'), chalk.yellow(`${client.version.private.user.tag} (private)`));
			// ———————————————[Status]———————————————
			client.version.private.user.setActivity(`${prefix}help || ${client.version.private.guilds.cache.size} ${client.version.private.guilds.cache.size > 1 ? 'Servers' : 'Server'}`, { type: 'WATCHING' });
		});
	}
};
