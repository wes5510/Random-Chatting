const net = require('net'), svrSocket = net.createServer(), Server = require('./src/dist/server.js');
const server = new Server(svrSocket, { port: 123 });
server.run();

