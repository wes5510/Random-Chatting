const net = require('net'), svrSocket = net.createServer(), Server = require('./src/es6/server.js'), config = require('./resources/es6/config.js');
const server = new Server(svrSocket, { host: config.HOST, port: config.PORT, backlog: config.BACKLOG });
server.run();