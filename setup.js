const config = require('./config.js');
const { exec } = require('child_process');

switch (config.db) {
	case 'disabled':
		console.log('You have deactivated the database.');
		break;

	case 'mapdb':
		exec('npm i quickmap.db');
		console.log('DB installed succesfully.');
		break;

	default:
		console.log('You haven\'t set up any database.');
		break;
}

switch (config.discord.enabled) {
	case true:
		if (config.discord.discordjsversion == 'latest') {
			var dsjsversion = '';
		} else {
			var dsjsversion = `@${config.discord.discordjsversion}`;
		}
		exec(`npm i discord.js${dsjsversion}`);

		if (!dsjsversion) {
			msg = '.'
		} else {
			msg = ' at version '+dsjsversion
		}
		console.log('Discord.js installed successfully'+msg);
		break;

	case false:
		console.log('You have disabled the Discord bot.');
		break;
}