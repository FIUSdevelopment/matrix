module.exports = async (client) => {
	const { MessageEmbed } = require('discord.js');
	const { name, avatar } = client.config.discord.client;
	var clientname = name;
	var clientavatar = avatar;
	if (client.config.debug) {
		console.log('[Debug] Discord event "messageCreate" online');
	}
	const {developperId, prefix} = client.config.discord
	client.on('messageCreate', async (message) => {
		if (client.config.debug) {
			console.log('[Debug] Discord event "messageCreate" has been invoked');
			if (message.content.toLocaleLowerCase().startsWith(client.config.discord.prefix)) {
				return message.reply('Debug mode enabled, disable it in the config');
			}
		}
		if (client.config.logAllMessages) {
			console.log(`[Message] ${message.content}`);
		}
		if (message.author.bot && !client.config.discord.whitelistedBots.includes(message.author.id)) return;
		if (!message.content.toLowerCase().startsWith(client.config.discord.prefix)) return;

		if (!message.member) {message.member = await message.guild.fetchMember(message);}
		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(' ');

		const command = client.commands.get(cmd.toLowerCase()) || client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
		
		if (!command){
			let nocmd_embed = new MessageEmbed()
			.setTitle(`:x: | No Command Found! Try Using  \`${prefix}help\``)
			.setColor('RED')
			.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
			.setTimestamp();
			return message.channel.send({ embeds: [nocmd_embed] });
		}

		if (command.version == 1) {

			if (command.private) {
				const noBotEmbed = new MessageEmbed()
					.setTitle(':x: | This command is private')
					.setColor('RED')
					.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}`})
					.setTimestamp();
				if (!client.guilds.cache.get(message.guild.id).members.cache.get('892046965280489533')) {
					message.channel.send({ embeds: [noBotEmbed] })
				}
			} else if (command.beta) {
				const noBotEmbed = new MessageEmbed()
					.setTitle(':x: | This command is beta')
					.setDescription(`Invite ${client.config.discord.beta.name} with this [link](https://discord.com/oauth2/authorize?client_id=${client.version.beta.application.id}&permissions=1644971949567&scope=bot%20applications.commands)`)
					.setColor('RED')
					.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}`})
					.setTimestamp();
				if (!client.guilds.cache.get(message.guild.id).members.cache.get('890286733114093588')) {
					message.channel.send({ embeds: [noBotEmbed] })
				}
			} else if (command.premium) {
				const noBotEmbed = new MessageEmbed()
					.setTitle(':x: | This command is premium')
					.setColor('RED')
					.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}`})
					.setTimestamp();
				if (!client.guilds.cache.get(message.guild.id).members.cache.get('892046513772044398')) {
					message.channel.send({ embeds: [noBotEmbed] })
				}
			} else {
				if (command.toggleOff) {
					let toggleoff_embed = new MessageEmbed()
						.setTitle(
							':x: | That Command Has Been Disabled By The Developers! Please Try Later.',
						)
						.setColor('RED')
						.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
						.setTimestamp();
					return message.reply({ embeds: [toggleoff_embed] });
				} else if (!message.member.permissions.has(command.userPermissions || [])) {
					let userperms_embed = new MessageEmbed()
						.setTitle(':x: | You Don\'t Have Permissions To Use The Command!')
						.setColor('RED')
						.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
						.setTimestamp();
					return message.reply({ embeds: [userperms_embed] });
				} else if (!message.guild.me.permissions.has(command.botPermissions || [])) {
					let botperms_embed = new MessageEmbed()
						.setTitle(':x: | I Don\'t Have Permissions To Use The Command!')
						.setColor('RED')
						.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
						.setTimestamp();
					return message.reply({ embeds: [botperms_embed] });
				} else if (command.developersOnly) {
					if (!developerID.includes(message.author.id)) {
						let developersOnly_embed = new MessageEmbed()
							.setTitle(':x: | Only Developers Can Use That Command!')
							.setDescription(
								`Developers: ${developerID.map((v) => `<@${v}>`).join(',')}`,
							)
							.setColor('RED')
							.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
							.setTimestamp();
						return message.reply({ embeds: [developersOnly_embed] });
					}
				} else if (command.cooldowns) {
					if (client.cooldowns.has(`${command.name}${message.author.id}`)) {
						let cooldown_embed = new MessageEmbed()
							.setTitle(`${randomMessages_Cooldown[Math.floor(Math.random() * randomMessages_Cooldown.length)]}`)
							.setDescription(`You Need To Wait \`${ms(client.cooldowns.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` To Use \`${prefix}${command.name}\` again!`)
							.setColor('BLUE')
							.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
							.setTimestamp();
			
						return message.reply({ embeds: [cooldown_embed] });
					}
			
					client.cooldowns.set(
						`${command.name}${message.author.id}`,
						Date.now() + command.cooldowns,
					);
			
					setTimeout(() => {
						client.cooldowns.delete(`${command.name}${message.author.id}`);
					}, command.cooldowns);
				}else if(command.requiresArgument && !args.length){
					let no_args_embed = new MessageEmbed()
						.setTitle(`❌ Missing args`)
						.setDescription(`You need to specify at least one argument for using this command!`)
						.setColor('BLUE')
						.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
						.setTimestamp();
			
					return message.reply({ embeds: [cooldown_embed] });
				}
					
				await command.run(client, message, args);
			}
		}
	});
	if (client.config.discord.beta.type == 'multi') {
		client.version.beta.on('messageCreate', async (message) => {
			if (!message.content.toLocaleLowerCase().startsWith(prefix)) return;
			if (client.config.debug) {
				console.log('[Debug] Discord event "messageCreate" has been invoked');
				if (message.content.toLocaleLowerCase().startsWith(client.config.discord.prefix)) {
					return message.reply('Debug mode enabled, disable it in the config');
				}
			}
			if (message.author.bot) {
				if (!client.config.discord.whitelistedBots.includes(message.author.id)) {
					return;
				}
			}
			if (!message.content.toLocaleLowerCase().startsWith(client.config.discord.prefix)) {
				return;
			}
	
			if (!message.member) {message.member = await message.guild.fetchMember(message);}
			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(' ');
	
			const command = client.commands.get(cmd.toLowerCase()) || client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
	
			if (cmd.length === 0) return;
			if (!command) return;
	
			if (command.version == 1) {
	
				if (command.private) {
					return;
				} else if (command.beta) {
					if (command.toggleOff) {
						let toggleoff_embed = new MessageEmbed()
							.setTitle(
								':x: | That Command Has Been Disabled By The Developers! Please Try Later.',
							)
							.setColor('RED')
							.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
							.setTimestamp();
						return message.reply({ embeds: [toggleoff_embed] });
					} else if (!message.member.permissions.has(command.userPermissions || [])) {
						let userperms_embed = new MessageEmbed()
							.setTitle(':x: | You Don\'t Have Permissions To Use The Command!')
							.setColor('RED')
							.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
							.setTimestamp();
						return message.reply({ embeds: [userperms_embed] });
					} else if (!message.guild.me.permissions.has(command.botPermissions || [])) {
						let botperms_embed = new MessageEmbed()
							.setTitle(':x: | I Don\'t Have Permissions To Use The Command!')
							.setColor('RED')
							.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
							.setTimestamp();
						return message.reply({ embeds: [botperms_embed] });
					} else if (command.developersOnly) {
						if (!developerID.includes(message.author.id)) {
							let developersOnly_embed = new MessageEmbed()
								.setTitle(':x: | Only Developers Can Use That Command!')
								.setDescription(
									`Developers: ${developerID.map((v) => `<@${v}>`).join(',')}`,
								)
								.setColor('RED')
								.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
								.setTimestamp();
							return message.reply({ embeds: [developersOnly_embed] });
						}
					} else if (command.cooldowns) {
						if (client.cooldowns.has(`${command.name}${message.author.id}`)) {
							let cooldown_embed = new MessageEmbed()
								.setTitle(`${randomMessages_Cooldown[Math.floor(Math.random() * randomMessages_Cooldown.length)]}`)
								.setDescription(`You Need To Wait \`${ms(client.cooldowns.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` To Use \`${prefix}${command.name}\` again!`)
								.setColor('BLUE')
								.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
								.setTimestamp();
				
							return message.reply({ embeds: [cooldown_embed] });
						}
				
						client.cooldowns.set(
							`${command.name}${message.author.id}`,
							Date.now() + command.cooldowns,
						);
				
						setTimeout(() => {
							client.cooldowns.delete(`${command.name}${message.author.id}`);
						}, command.cooldowns);
					}
					await command.run(client, message, args);
				} else if (command.premium) {
					return;
				} else {
					return;
				}
			}
		});
	}
	if (client.config.discord.private.type == 'multi') {
		client.version.private.on('messageCreate', async (message) => {
			if (!message.content.toLocaleLowerCase().startsWith(prefix)) return;
			if (client.config.debug) {
				console.log('[Debug] Discord event "messageCreate" has been invoked');
				if (message.content.toLocaleLowerCase().startsWith(client.config.discord.prefix)) {
					return message.reply('Debug mode enabled, disable it in the config');
				}
			}
			if (message.author.bot) {
				if (!client.config.discord.whitelistedBots.includes(message.author.id)) {
					return;
				}
			}
			if (!message.content.toLocaleLowerCase().startsWith(client.config.discord.prefix)) {
				return;
			}
	
			if (!message.member) {message.member = await message.guild.fetchMember(message);}
			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(' ');
	
			const command = client.commands.get(cmd.toLowerCase()) || client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
	
			if (cmd.length === 0) return;
			if (!command) return;
	
			if (command.version == 1) {
	
				if (command.private) {
					if (command.toggleOff) {
						let toggleoff_embed = new MessageEmbed()
							.setTitle(
								':x: | That Command Has Been Disabled By The Developers! Please Try Later.',
							)
							.setColor('RED')
							.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
							.setTimestamp();
						return message.reply({ embeds: [toggleoff_embed] });
					} else if (!message.member.permissions.has(command.userPermissions || [])) {
						let userperms_embed = new MessageEmbed()
							.setTitle(':x: | You Don\'t Have Permissions To Use The Command!')
							.setColor('RED')
							.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
							.setTimestamp();
						return message.reply({ embeds: [userperms_embed] });
					} else if (!message.guild.me.permissions.has(command.botPermissions || [])) {
						let botperms_embed = new MessageEmbed()
							.setTitle(':x: | I Don\'t Have Permissions To Use The Command!')
							.setColor('RED')
							.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
							.setTimestamp();
						return message.reply({ embeds: [botperms_embed] });
					} else if (command.developersOnly) {
						if (!developerID.includes(message.author.id)) {
							let developersOnly_embed = new MessageEmbed()
								.setTitle(':x: | Only Developers Can Use That Command!')
								.setDescription(
									`Developers: ${developerID.map((v) => `<@${v}>`).join(',')}`,
								)
								.setColor('RED')
								.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
								.setTimestamp();
							return message.reply({ embeds: [developersOnly_embed] });
						}
					} else if (command.cooldowns) {
						if (client.cooldowns.has(`${command.name}${message.author.id}`)) {
							let cooldown_embed = new MessageEmbed()
								.setTitle(`${randomMessages_Cooldown[Math.floor(Math.random() * randomMessages_Cooldown.length)]}`)
								.setDescription(`You Need To Wait \`${ms(client.cooldowns.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` To Use \`${prefix}${command.name}\` again!`)
								.setColor('BLUE')
								.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
								.setTimestamp();
				
							return message.reply({ embeds: [cooldown_embed] });
						}
				
						client.cooldowns.set(
							`${command.name}${message.author.id}`,
							Date.now() + command.cooldowns,
						);
				
						setTimeout(() => {
							client.cooldowns.delete(`${command.name}${message.author.id}`);
						}, command.cooldowns);
					}
					await command.run(client, message, args);
				} else if (command.beta) {
					return;
				} else if (command.premium) {
					return;
				} else {
					return;
				}
			}
		});
	}
	if (client.config.discord.premium.type == 'multi') {
		client.version.premium.on('messageCreate', async (message) => {
			if (!message.content.toLocaleLowerCase().startsWith(prefix)) return;
			if (client.config.debug) {
				console.log('[Debug] Discord event "messageCreate" has been invoked');
				if (message.content.toLocaleLowerCase().startsWith(client.config.discord.prefix)) {
					return message.reply('Debug mode enabled, disable it in the config');
				}
			}
			if (message.author.bot) {
				if (!client.config.discord.whitelistedBots.includes(message.author.id)) {
					return;
				}
			}
			if (!message.content.toLocaleLowerCase().startsWith(client.config.discord.prefix)) {
				return;
			}
	
			if (!message.member) {message.member = await message.guild.fetchMember(message);}
			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(' ');
	
			const command = client.commands.get(cmd.toLowerCase()) || client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
	
			if (cmd.length === 0) return;
			if (!command) return;
	
			if (command.version == 1) {
	
				if (command.private) {
					return;
				} else if (command.beta) {
					return;
				} else if (command.premium) {
					if (command.toggleOff) {
						let toggleoff_embed = new MessageEmbed()
							.setTitle(
								':x: | That Command Has Been Disabled By The Developers! Please Try Later.',
							)
							.setColor('RED')
							.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
							.setTimestamp();
						return message.reply({ embeds: [toggleoff_embed] });
					} else if (!message.member.permissions.has(command.userPermissions || [])) {
						let userperms_embed = new MessageEmbed()
							.setTitle(':x: | You Don\'t Have Permissions To Use The Command!')
							.setColor('RED')
							.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
							.setTimestamp();
						return message.reply({ embeds: [userperms_embed] });
					} else if (!message.guild.me.permissions.has(command.botPermissions || [])) {
						let botperms_embed = new MessageEmbed()
							.setTitle(':x: | I Don\'t Have Permissions To Use The Command!')
							.setColor('RED')
							.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
							.setTimestamp();
						return message.reply({ embeds: [botperms_embed] });
					} else if (command.developersOnly) {
						if (!developerID.includes(message.author.id)) {
							let developersOnly_embed = new MessageEmbed()
								.setTitle(':x: | Only Developers Can Use That Command!')
								.setDescription(
									`Developers: ${developerID.map((v) => `<@${v}>`).join(',')}`,
								)
								.setColor('RED')
								.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
								.setTimestamp();
							return message.reply({ embeds: [developersOnly_embed] });
						}
					} else if (command.cooldowns) {
						if (client.cooldowns.has(`${command.name}${message.author.id}`)) {
							let cooldown_embed = new MessageEmbed()
								.setTitle(`${randomMessages_Cooldown[Math.floor(Math.random() * randomMessages_Cooldown.length)]}`)
								.setDescription(`You Need To Wait \`${ms(client.cooldowns.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` To Use \`${prefix}${command.name}\` again!`)
								.setColor('BLUE')
								.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
								.setTimestamp();
				
							return message.reply({ embeds: [cooldown_embed] });
						}
				
						client.cooldowns.set(
							`${command.name}${message.author.id}`,
							Date.now() + command.cooldowns,
						);
				
						setTimeout(() => {
							client.cooldowns.delete(`${command.name}${message.author.id}`);
						}, command.cooldowns);
					}
					await command.run(client, message, args);
				} else {
					return;
				}
			}
		});
	}
};
