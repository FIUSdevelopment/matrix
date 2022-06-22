async function getTranslations(language, type, category, name) {
    if (!language) {
        language = 'en';
    }
    const translations = require(`../language/${language}/${type}/${category}/${name}.js`);
    return translations;
}

async function getLanguage(client, guildID) {
    const db = client.db.guilds.get(`${guildID}.settings.language`);
    // if (!db) db = 'en';
    return db;
}

module.exports = { getTranslations, getLanguage }