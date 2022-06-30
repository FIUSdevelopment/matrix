const http = require("http");

module.exports = async (config) => {
    const host = config.webserver.host;
    const port = config.webserver.port;

    const requestListener = function (req, res) {
        res.writeHead(200);
        res.end("My first server!");
    };

    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
}