const config = require('../config.js');
const { exec } = require('child_process');

switch (config.database.type) {
case 'disabled':
	console.log('You have deactivated the database.');
	break;

case 'mapdb':        
	exec('npm i quickmap.db', (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`${stdout}`);
		console.error(`${stderr}`);
	});
	break;

default:
	console.log('You haven\'t set up any database.');
	break;
}

switch (config.discord.enabled) {
case true: {
	let dsjsversion;
	if (config.discord.discordjsversion == 'latest') {
		dsjsversion = '';
	} else {
		dsjsversion = `@${config.discord.discordjsversion}`;
	}
	exec(`npm i discord.js${dsjsversion}`, (error, stdout, stderr) => {
		if (error) {
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`${stdout}`);
		console.error(`${stderr}`);
	});
	let msg;
	if (!dsjsversion) {
		msg = '.';
	} else {
		msg = ' at version ' + dsjsversion;
	}
	console.log('Discord.js installed successfully' + msg);
	break;
}

case false:
{
	console.log('You have disabled the Discord bot.');
	break;
}}

exec('npm i chalk@^4.1.2', (error, stdout, stderr) => {
	if (error) {
		console.error(`exec error: ${error}`);
		return;
	}
	console.log(`${stdout}`);
	console.error(`${stderr}`);
});

exec('npm i glob', (error, stdout, stderr) => {
	if (error) {
		console.error(`exec error: ${error}`);
		return;
	}
	console.log(`${stdout}`);
	console.error(`${stderr}`);
});

exec('npm i util', (error, stdout, stderr) => {
	if (error) {
		console.error(`exec error: ${error}`);
		return;
	}
	console.log(`${stdout}`);
	console.error(`${stderr}`);
});

exec('npm i fs', (error, stdout, stderr) => {
	if (error) {
		console.error(`exec error: ${error}`);
		return;
	}
	console.log(`${stdout}`);
	console.error(`${stderr}`);
});