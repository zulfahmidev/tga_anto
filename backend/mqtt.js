const mosca = require('mosca');
const server = new mosca.Server({
    port: 1883
});

module.exports = server;