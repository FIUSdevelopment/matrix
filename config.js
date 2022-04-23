module.exports = {
    db: 'mapdb', // disabled, mapdb
    discord: {
        enabled: true,
        discordjsversion: 'latest', // latest or search on github
        token: 'ODkyMDQ2OTY1MjgwNDg5NTMz.YVHNeQ.HqzvBrns2nWRMO9alc4j9s5XpFc', // discord.dev
        intents: 32767, // use discord intents calculator to get the number
    },
    telegram: {
        enabled: false,
    },
    webserver: {
        enabled: false,
    },
};