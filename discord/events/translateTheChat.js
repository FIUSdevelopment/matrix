const translate = require('@vitalets/google-translate-api');
const itId = '949061190619918357';
const enId = '982611279330021397';
const deId = '982612106065088543';
module.exports = async (client) => {
	if (client.config.debug) {
		console.log('[Debug] Discord event "messageCreate" online');
	}
	client.on('messageCreate', async (message) => {
        originalMessage = message.content;
        if (message.author.bot) {
            return;
        }
        if (message.channel.id == itId) {
            // IT to EN
            translate(originalMessage, {to: 'en'}).then(res => {
                text = res.text;
                message.content = text.replace('@', '');
                client.channels.cache.get(enId).send(`${message.author.tag}\n${message}`);
            })
/*            // IT to DE
            translate(originalMessage, {to: 'de'}).then(res => {
                text = res.text;
                message.content = text.replace('@', '');
                client.channels.cache.get(deId).send(`${message.author.tag}\n${message}`);
            })*/
        } else if (message.channel.id == enId) {
            // EN to IT
            translate(originalMessage, {to: 'it'}).then(res => {
                text = res.text;
                message.content = text.replace('@', '');
                client.channels.cache.get(itId).send(`${message.author.tag}\n${message}`);
            })
            // EN to DE
    /*        translate(originalMessage, {to: 'de'}).then(res => {
                text = res.text;
                message.content = text.replace('@', '');
                client.channels.cache.get(deId).send(`${message.author.tag}\n${message}`);
            })
        } else if (message.channel.id == deId) {
            // DE to IT
            translate(originalMessage, {to: 'it'}).then(res => {
                text = res.text;
                message.content = text.replace('@', '');
                client.channels.cache.get(itId).send(`${message.author.tag}\n${message}`);
            })
            // DE to EN
            translate(originalMessage, {to: 'en'}).then(res => {
                text = res.text;
                message.content = text.replace('@', '');
                client.channels.cache.get(enId).send(`${message.author.tag}\n${message}`);
            }) */
        } else {
            return;
        }
    })
}