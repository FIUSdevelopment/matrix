const Discord = require('discord.js');
const { exec } = require('child_process');
const package = require('../../../package.json');

module.exports = {
    name: 'github',
    aliases: [],
    description: 'Resync the bot with github',
    usage: '<upload/resync/download> <text(only for upload or resync)>',
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
		if (args[0] == 'upload') {
			const prefix = client.config.discord.prefix;
			const exclude = prefix.length + 8 + 6;
			let committitle = message.content.substring(exclude, 50 + exclude);
			if (!committitle) committitle = 'No Description';
			exec(`git add --all && git commit -m '${committitle}' && git push`, (error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return;
				}
				console.log(`${stdout}`);
				console.error(`${stderr}`);
			});

			const embed = new Discord.MessageEmbed()
				.setTitle('Code uploaded successfully')
				.setDescription('Repos link: https://github.com/fiusdevelopment/mr.handy')
				.addField('Commit Title', `${committitle}`);
			message.channel.send({ embeds: [embed] });
		} else if (args[0] == 'download') {
			exec('git pull', (error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return;
				}
				console.log(`${stdout}`);
				console.error(`${stderr}`);
			});
			const embed = new Discord.MessageEmbed()
				.setTitle('Code downloaded Successfully');
			message.channel.send({ embeds: [embed] });
		} else if (args[0] == 'resync') {
			const prefix = client.config.discord.prefix;
			const exclude = prefix.length + 8 + 6;
			let committitle = message.content.substring(exclude, 50 + exclude);
			if (!committitle) committitle = 'No Description';
			exec(`git pull && git add --all && git commit -m '${committitle}' && git push`, (error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return;
				}
				console.log(`${stdout}`);
				console.error(`${stderr}`);
			});
			const embed = new Discord.MessageEmbed()
				.setTitle('Code resynched successfully')
				.setDescription('Repos link: https://github.com/fiusdevelopment/mr.handy')
				.addField('Commit Title', `${committitle}`);
			message.channel.send({ embeds: [embed] });
		} else if (args[0] == 'stash') {
			exec(`git stash`, (error, stdout, stderr) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return;
				}
				console.log(`${stdout}`);
				console.error(`${stderr}`);
			});
			const embed = new Discord.MessageEmbed()
				.setTitle('Code stash successfully')
				.setDescription('Repos link: https://github.com/fiusdevelopment/mr.handy')
			message.channel.send({ embeds: [embed] });
		}
	},
}