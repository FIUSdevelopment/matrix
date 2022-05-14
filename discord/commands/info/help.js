const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
module.exports = {
    name: 'help',
    aliases: [],
    description: 'Give the help message with the list of the commands',
    usage: '',
    toggleOff: false,
    developersOnly: false,
    private: false,
    beta: false,
    premium: false,
    userPermissions: [],
    botPermissions: [],
    cooldowns: 0, // number or false
    version: 1,

    run: async (client, message, args) => {
        const { name, avatar } = client.config.discord.client;
        const { helpEmoji } = client.config.discord;
        const helpemoji = helpEmoji;
        const clientname = name;
        const clientavatar = avatar;
        const roleColor = message.guild.me.displayHexColor === '#000000' ? '#ffffff' : message.guild.me.displayHexColor;

		const directories = [
			...new Set(client.commands.map((cmd) => cmd.directory)),
		];

		const formatString = (str) => {
			return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
		};

		const categories = directories.map((dir) => {
			const getCommands = client.commands
				.filter((cmd) => cmd.directory === dir)
				.map((cmd) => {
					return {
						name: cmd.name ? cmd.name : 'No command name!',
						description: cmd.description ? cmd.description : 'No command description!',
					};
				});

			return {
				directory: formatString(dir),
				commands: getCommands,
			};
		});

		const embed = new MessageEmbed()
			.setTitle(`${clientname || 'Bot'}'s Commands`)
			.setDescription(
				'Please choose one of the options in the dropdown below!',
			)
			.setColor(roleColor)
			.setFooter({ text: clientname, iconURL: clientavatar })
			.setTimestamp();

		const components = (state) => [
			new MessageActionRow().addComponents(
				new MessageSelectMenu()
					.setCustomId('help-menu')
					.setPlaceholder('Please select a category!')
					.setDisabled(state)
					.addOptions([
						categories.map((cmd) => {
							return {
								label: `${cmd.directory}`,
								value: `${cmd.directory.toLowerCase()}`,
								emoji: `${helpemoji[cmd.directory.toLowerCase()]}`,
								description: 'Commands from ' + `${cmd.directory}` + ' category',
							};
						}),
					]),
			),
		];

		const inMessage = await message.channel.send({
			embeds: [embed],
			components: components(false),
		});

		const filter = (interaction) => interaction.user.id === message.author.id;

		const collector = message.channel.createMessageComponentCollector({
			filter,
			componentType: 'SELECT_MENU',
			time: 60000,
		});

		collector.on('collect', (interaction) => {
			const [directory] = interaction.values;
			const category = categories.find(
				(x) => x.directory.toLowerCase() === directory,
			);

			const embed2 = new MessageEmbed()
				.setTitle(`${directory.charAt(0).toUpperCase()}${directory.slice(1).toLowerCase()}`)
				.setDescription(
					'' + category.commands.map((cmd) => `✪ | \`${cmd.name}\` (*${cmd.description}*)`).join('\n '),
				)
				.setColor(roleColor);

			interaction.update({ embeds: [embed2] });
		});

		collector.on('end', () => {
			inMessage.edit({ components: components(true) });
		});
    },
}