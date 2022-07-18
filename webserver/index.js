const http = require("http");

module.exports = async (config) => {
    //const host = config.webserver.host;
    const port = config.webserver.port;

    const express = require('express');
    const app = express();

    app.listen(port, () => {
        console.log(`Matrix listening on port ${port}`);
    })
    app.use(express.static('website'))
}