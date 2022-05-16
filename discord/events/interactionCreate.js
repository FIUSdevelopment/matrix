const { config } = require('../..');

module.exports = async (client) => {
    const { MessageEmbed } = require('discord.js');
    const { name, avatar } = client.config.discord.client;
    var clientname = name;
    var clientavatar = avatar;
    if (client.config.debug) {
        console.log('[Debug] Discord event "interactionCreate" online')
    }
    client.on('interactionCreate', async (interaction) => {

    	// ———————————————[Slash Commands]———————————————
	    if (interaction.isCommand()) {
			const command = client.slashCommands.get(interaction.commandName);
			if (!command){return interaction.reply({ content: 'An error has occured ' });}
	
			if (!interaction.member.permissions.has(command.userPermissions || [])) {
				let userperms_embed = new MessageEmbed()
					.setTitle(':x: | You Don\'t Have Permissions To Use The Command!')
					.setColor('RED')
					.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
					.setTimestamp();
				return interaction.reply({ embeds: [userperms_embed] });
			} else if (!interaction.guild.me.permissions.has(command.botPermissions || [])) {
				let botperms_embed = new MessageEmbed()
					.setTitle(':x: | I Don\'t Have Permissions To Use The Command!')
					.setColor('RED')
					.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
					.setTimestamp();
				return interaction.reply({ embeds: [botperms_embed] });
			};
	

	    	const args = [];

		    for (let option of interaction.options.data) {
			    if (option.type === 'SUB_COMMAND') {
				    if (option.name) args.push(option.name);
				    option.options?.forEach((x) => {
					    if (x.value) args.push(x.value);
			    	});
		    	} else if (option.value) {args.push(option.value);}
	    	}
		    interaction.member = interaction.guild.members.cache.get(interaction.user.id);
		    command.run(client, interaction, args);
	    }
	    // ———————————————[Buttons]———————————————
	    if (interaction.isButton()) {}
	    // ———————————————[Select Menu]———————————————
	    if (interaction.isSelectMenu()) {}
	    // ———————————————[Context Menu]———————————————
	    if (interaction.isContextMenu()) {
	    	await interaction.deferReply({ ephemeral: false });
			const command = client.slashCommands.get(interaction.commandName);
	    	if (command) command.run(client, interaction);
	    }
    });
	if (client.config.discord.beta.type == 'multi') {
		client.version.beta.on('interactionCreate', async (interaction) => {

			// ———————————————[Slash Commands]———————————————
			if (interaction.isCommand()) {
				const command = client.slashCommands.get(interaction.commandName);
				if (!command){return interaction.reply({ content: 'An error has occured ' });}
		
				if (!interaction.member.permissions.has(command.userPermissions || [])) {
					let userperms_embed = new MessageEmbed()
						.setTitle(':x: | You Don\'t Have Permissions To Use The Command!')
						.setColor('RED')
						.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
						.setTimestamp();
					return interaction.reply({ embeds: [userperms_embed] });
				} else if (!interaction.guild.me.permissions.has(command.botPermissions || [])) {
					let botperms_embed = new MessageEmbed()
						.setTitle(':x: | I Don\'t Have Permissions To Use The Command!')
						.setColor('RED')
						.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
						.setTimestamp();
					return interaction.reply({ embeds: [botperms_embed] });
				};
		
	
				const args = [];
	
				for (let option of interaction.options.data) {
					if (option.type === 'SUB_COMMAND') {
						if (option.name) args.push(option.name);
						option.options?.forEach((x) => {
							if (x.value) args.push(x.value);
						});
					} else if (option.value) {args.push(option.value);}
				}
				interaction.member = interaction.guild.members.cache.get(interaction.user.id);
				command.run(client, interaction, args);
			}
			// ———————————————[Buttons]———————————————
			if (interaction.isButton()) {}
			// ———————————————[Select Menu]———————————————
			if (interaction.isSelectMenu()) {}
			// ———————————————[Context Menu]———————————————
			if (interaction.isContextMenu()) {
				await interaction.deferReply({ ephemeral: false });
				const command = client.slashCommands.get(interaction.commandName);
				if (command) command.run(client, interaction);
			}
		});
	}
	if (client.config.discord.premium.type == 'multi') {
		client.version.premium.on('interactionCreate', async (interaction) => {

			// ———————————————[Slash Commands]———————————————
			if (interaction.isCommand()) {
				const command = client.slashCommands.get(interaction.commandName);
				if (!command){return interaction.reply({ content: 'An error has occured ' });}
		
				if (!interaction.member.permissions.has(command.userPermissions || [])) {
					let userperms_embed = new MessageEmbed()
						.setTitle(':x: | You Don\'t Have Permissions To Use The Command!')
						.setColor('RED')
						.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
						.setTimestamp();
					return interaction.reply({ embeds: [userperms_embed] });
				} else if (!interaction.guild.me.permissions.has(command.botPermissions || [])) {
					let botperms_embed = new MessageEmbed()
						.setTitle(':x: | I Don\'t Have Permissions To Use The Command!')
						.setColor('RED')
						.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
						.setTimestamp();
					return interaction.reply({ embeds: [botperms_embed] });
				};
		
	
				const args = [];
	
				for (let option of interaction.options.data) {
					if (option.type === 'SUB_COMMAND') {
						if (option.name) args.push(option.name);
						option.options?.forEach((x) => {
							if (x.value) args.push(x.value);
						});
					} else if (option.value) {args.push(option.value);}
				}
				interaction.member = interaction.guild.members.cache.get(interaction.user.id);
				command.run(client, interaction, args);
			}
			// ———————————————[Buttons]———————————————
			if (interaction.isButton()) {}
			// ———————————————[Select Menu]———————————————
			if (interaction.isSelectMenu()) {}
			// ———————————————[Context Menu]———————————————
			if (interaction.isContextMenu()) {
				await interaction.deferReply({ ephemeral: false });
				const command = client.slashCommands.get(interaction.commandName);
				if (command) command.run(client, interaction);
			}
		});
	};
	if (client.config.discord.private.type == 'multi') {
		client.version.private.on('interactionCreate', async (interaction) => {

			// ———————————————[Slash Commands]———————————————
			if (interaction.isCommand()) {
				const command = client.slashCommands.get(interaction.commandName);
				if (!command){return interaction.reply({ content: 'An error has occured ' });}
		
				if (!interaction.member.permissions.has(command.userPermissions || [])) {
					let userperms_embed = new MessageEmbed()
						.setTitle(':x: | You Don\'t Have Permissions To Use The Command!')
						.setColor('RED')
						.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
						.setTimestamp();
					return interaction.reply({ embeds: [userperms_embed] });
				} else if (!interaction.guild.me.permissions.has(command.botPermissions || [])) {
					let botperms_embed = new MessageEmbed()
						.setTitle(':x: | I Don\'t Have Permissions To Use The Command!')
						.setColor('RED')
						.setFooter({ text: `${clientname}`, iconURL: `${clientavatar}` })
						.setTimestamp();
					return interaction.reply({ embeds: [botperms_embed] });
				};
		
	
				const args = [];
	
				for (let option of interaction.options.data) {
					if (option.type === 'SUB_COMMAND') {
						if (option.name) args.push(option.name);
						option.options?.forEach((x) => {
							if (x.value) args.push(x.value);
						});
					} else if (option.value) {args.push(option.value);}
				}
				interaction.member = interaction.guild.members.cache.get(interaction.user.id);
				command.run(client, interaction, args);
			}
			// ———————————————[Buttons]———————————————
			if (interaction.isButton()) {}
			// ———————————————[Select Menu]———————————————
			if (interaction.isSelectMenu()) {}
			// ———————————————[Context Menu]———————————————
			if (interaction.isContextMenu()) {
				await interaction.deferReply({ ephemeral: false });
				const command = client.slashCommands.get(interaction.commandName);
				if (command) command.run(client, interaction);
			}
		});
	};
}