const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { readdirSync } = require("fs");
const ms = require("ms");
module.exports = {
    name: 'help',
    aliases: [],
    description: 'Give the help message with the list of the commands',
    usage: '',
	icon: ':question:',
    toggleOff: false,
    developersOnly: false,
    private: false,
    beta: true,
    premium: false,
    userPermissions: [],
    botPermissions: [],
    cooldowns: 0, // number or false
    version: 1,

    run: async (client, message, args) => {
		const prefix = client.config.discord.prefix;
		if (args[0]) {
			let cots = [];
			let catts = [];
   
			readdirSync("./discord/commands/").forEach((dir) => {
			   if (dir.toLowerCase() !== args[0].toLowerCase()) return;
   
			   const commands = readdirSync(`./discord/commands/${dir}`).filter((file) =>
				  file.endsWith(".js")
			   );
   
			   const cmds = commands.map((command) => {
				  let file = require(`../../commands/${dir}/${command}`);
   
				  if (!file.name) return "No command name.";
   
				  let name = file.name.replace(".js", "");
   
				  let des = client.commands.get(name).description;
				  let emo = client.commands.get(name).emoji;
   
				  let obj = {
					 cname: `${emo ? emo : ""} - \`${name}\``,
					 des,
				  };
   
				  return obj;
			   });
   
			   let dota = new Object();
   
			   cmds.map((co) => {
				  dota = {
					 name: `${cmds.length === 0 ? "In progress." : co.cname}`,
					 value: co.des ? co.des : "No Description",
					 inline: true,
				  };
				  catts.push(dota);
			   });
   
			   cots.push(dir.toLowerCase());
			});
   
			const command =
			   client.commands.get(args[0].toLowerCase()) ||
			   client.commands.find(
				  (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
			   );
   
			if (cots.includes(args[0].toLowerCase())) {
			   return;
			}
   
			if (!command) {
			   const embed = new MessageEmbed()
				  .setTitle(
					 `Invalid command! Use \`${prefix}help\` for all of my commands!`
				  )
				  .setColor("RED");
			   return message.channel.send({ embeds: [embed] });
			}

			let name, aliases, cooldowns, description, usage, commandstatus, developersonly, userpermissions, botpermissions;

			let bpp;

			if (command.name) {
				if (command.private) {
					bpp = ' (Private'
				}
				if (command.premium) {
					if (bpp) bpp = bpp + ', Premium';
					else bpp = ' (Premium'
				}
				if (command.beta) {
					if (bpp) bpp = bpp + ', Beta';
					else bpp = ' (Beta'
				}
				if (bpp) bpp = bpp + ')';
				if (!bpp) bpp = ''
				name = command.name + bpp;
			} else {
				name = 'Error';
			}

			if (command.aliases) {
				aliases = command.aliases.join(' ,');
			} else {
				aliases = 'No aliases for this command.';
			}

			if (command.cooldowns) {
				cooldowns = `${command.cooldowns} ms`;
			} else {
				cooldowns = 'None.';
			}

			if (command.description) {
				description = command.description;
			} else {
				description = 'No description for this command.';
			}

			if (command.usage) {
				usage = `${prefix}${command.name} ${command.usage}`;
			} else {
				usage = `${prefix}${command.name}`;
			}

			if (command.toggleOff) {
				commandstatus = 'Offline';
			} else {
				commandstatus = 'Online';
			}

			if (command.developersOnly) {
				developersonly = 'Yes';
			} else {
				developersonly = 'No';
			}

			if (command.botPermissions) {
				botpermissions = command.botPermissions;
			} else {
				botpermissions = 'None.';
			}

			if (command.userPermissions) {
				userpermissions = command.userPermissions;
			} else {
				userpermissions = 'None.'
			}

			const embed = new MessageEmbed()
			   .setTitle("Command Details:")
			   .addField("Command:", command.icon+name)
			   .addField("Aliases:", aliases+'.')
			   .addField("Cooldowns:", cooldowns)
			   .addField("Description:", description)
			   .addField("Usage:", usage)
			   .addField("Command Status:", commandstatus)
			   .addField("DevelopersOnly:", developersonly)
			   .addField("Bot-Permissions Required:", botpermissions+'.')
			   .addField("User-Permissions Required:", userpermissions+'.')
   
			   .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
			   .setTimestamp()
			   .setColor("BLURPLE");
			return message.channel.send({ embeds: [embed] });
		} else {
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
													icon: cmd.icon ? cmd.icon : '✪', 
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
						'' + category.commands.map((cmd) => `${cmd.icon} | \`${cmd.name}\` (*${cmd.description}*)`).join('\n'),
					)
					.setColor(roleColor);
	
				interaction.update({ embeds: [embed2] });
			});
	
			collector.on('end', () => {
				inMessage.edit({ components: components(true) });
			});
		}
    },
}