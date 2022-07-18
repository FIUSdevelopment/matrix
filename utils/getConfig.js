async function getConfig() {
    const { settingsFile } = require('../config.js')
    return settingsFile
}
module.exports = { getConfig }