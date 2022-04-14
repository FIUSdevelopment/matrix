const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const { Client, Message } = require("discord.js");

module.exports = async (client) => {
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));
};