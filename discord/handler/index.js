const { glob } = require('glob');
const { promisify } = require('util');
const globPromise = promisify(glob);
const chalk = require('chalk');

module.exports = async (client) => {
    const config = client.config;

	if (config.debug) {
		console.log('[Debug] Discord handler online')
	}
	// ———————————————[Commands]———————————————
	const commandFiles = await globPromise(`${process.cwd()}/discord/commands/**/*.js`);
	commandFiles.map((value) => {
		const file = require(value);
		const splitted = value.split('/');
		const directory = splitted[splitted.length - 2];

		if (file.name) {
			const properties = { directory, ...file };
			client.commands.set(file.name, properties);
		}
	});

	// ———————————————[Events]———————————————
	const eventFiles = await globPromise(`${process.cwd()}/discord/events/*.js`);
	eventFiles.map((value) => require(value)(client));

	// ———————————————[Slash Commands]———————————————
	const slashCommands = await globPromise(`${process.cwd()}/discord/slashCommands/*/*.js`);

	const arrayOfSlashCommands = [];
	const arrayOfSlashCommandsPrivate = [];
	const arrayOfSlashCommandsBeta = [];
	const arrayOfSlashCommandsPremium = [];

	slashCommands.map((value) => {
		const file = require(value);
		if (!file?.name) return;

		if (client.config.debug) {
			console.log(`Loading ${file.name}`)
		}

		client.slashCommands.set(file.name, file);

		if (['MESSAGE', 'USER'].includes(file.type)) delete file.description;

		if (file.private) {
			arrayOfSlashCommandsPrivate.push(file);
		} else if (file.beta) {
			arrayOfSlashCommandsBeta.push(file);
		} else if (file.premium) {
			arrayOfSlashCommandsPremium.push(file);
		} else {
			arrayOfSlashCommands.push(file)
		}
	});
	client.on('ready', async () => {
/*		if (client.config.debug) {
			console.log(arrayOfSlashCommands);
			console.log(arrayOfSlashCommandsBeta);
			console.log(arrayOfSlashCommandsPremium);
			console.log(arrayOfSlashCommandsPrivate);
		} */
		if (config.discord.slashCommandsPublic) {
			await client.application.commands.set(arrayOfSlashCommands);

			if (config.discord.private.type == 'multi') {
				config.discord.privateServers.forEach(async supportServerID => {
					await client.version.private.guilds.cache.get(supportServerID).commands.set(arrayOfSlashCommandsPrivate);
				})
			}
			if (config.discord.beta.type == 'multi') {
				client.version.beta.application.commands.set(arrayOfSlashCommandsBeta)
			}
			if (config.discord.premium.type == 'multi') {
				client.version.premium.application.commands.set(arrayOfSlashCommandsPremium)
			}
		} else if (!config.discord.slashCommandsPublic) {
			config.discord.privateServers.forEach(async supportServerID => {
				if (config.discord.private.type == 'multi') {

					arrayOfSlashCommandsPrivate.forEach(async command => {
						arrayOfSlashCommands.push(command)
					})
                	await client.version.private.guilds.cache.get(supportServerID).commands.set(arrayOfSlashCommands);
				} else {
					arrayOfSlashCommandsPrivate.forEach(async command => {
						arrayOfSlashCommands.push(command)
					})
                	await client.guilds.cache.get(supportServerID).commands.set(arrayOfSlashCommands);
				}
				if (config.discord.beta.type == 'multi') {
					client.version.beta.application.commands.set(arrayOfSlashCommandsBeta)
				}
				if (config.discord.premium.type == 'multi') {
					client.version.premium.application.commands.set(arrayOfSlashCommandsPremium)
				}
            })
		}
	});
};
