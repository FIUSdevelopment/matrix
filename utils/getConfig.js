async function getConfig() {
    const config = require('../config.js')
    return config
}
module.exports = { getConfig }