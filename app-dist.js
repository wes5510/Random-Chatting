'use strict';

var net = require('net'),
    svrSocket = net.createServer(),
    Server = require('./src/dist/server.js');
var server = new Server(svrSocket, { port: 123 });
server.run();
//# sourceMappingURL=app-dist.js.map
