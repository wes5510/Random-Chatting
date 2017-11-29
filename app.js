const net = require('net'), svrSocket = net.createServer(), Server = require('./src/dist/server.js'), config = require('./resources/config.js');
const server = new Server(svrSocket, { host: config.HOST, port: config.PORT, backlog: config.BACKLOG });
server.run();
