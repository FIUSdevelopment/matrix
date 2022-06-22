const { MessageEmbed } = require('discord.js');
const glob = require('glob');
const chalk = require('chalk');

module.exports = {
    name: 'reload',
    aliases: [],
    description: 'Reload all commands',
    usage: '',
    icon: '',
    toggleOff: false,
    developersOnly: true,
    private: false,
    beta: false,
    premium: false,
    userPermissions: [],
    botPermissions: [],
    cooldowns: 0, // number or false
    version: 1,

    run: async (client, message, args) => {
		const { name, avatar } = client.config.discord.client;
        clientname = name;
        clientavatar = avatar; 
		client.commands.sweep(() => true);
		glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
			if (err) return console.log(err);
			filePaths.forEach((file) => {
				delete require.cache[require.resolve(file)];

				const pull = require(file);
				if (pull.name) {
					console.log(
						chalk.red('✪ ') +
                     chalk.blue('Reloaded ') +
                     chalk.green(`${pull.name} `) +
                     chalk.blue('Command'),
					);
					client.commands.set(pull.name, pull);
				}

				if (pull.aliases && Array.isArray(pull.aliases)) {
					pull.aliases.forEach((alias) => {
						client.aliases.set(alias, pull.name);
					});
				}
			});
		});
		let reload_embed = new MessageEmbed()
			.setTitle(':white_check_mark: | Reloaded All Commands')
			.setColor('GREEN')
			.setFooter(`${clientname}`, `${clientavatar}`)
			.setTimestamp();
		message.reply({ embeds: [reload_embed] });
	},
}