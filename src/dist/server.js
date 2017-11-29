'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChattingManager = require('./chatting-manager.js');

var Server = function () {
  function Server(socket, options) {
    _classCallCheck(this, Server);

    this._socket = socket;
    this._chattingManager = new ChattingManager();
    if (options) {
      this._port = options[Server.optionNames.port] ? options[Server.optionNames.port] : Server.port;
      this._host = options[Server.optionNames.host] ? options[Server.optionNames.host] : Server.host;
      this._backlog = options[Server.optionNames.backlog] ? options[Server.optionNames.backlog] : Server.backlog;
    } else {
      this._port = Server.port;
      this._host = Server.host;
    }
  }

  _createClass(Server, [{
    key: 'run',
    value: function run() {
      var _this = this;

      var self = this;
      self._socket.listen(self._port, self._host, self._backlog, function () {
        console.log('server(' + self._socket.address().address + ':' + self._socket.address().port + ') bound');
        _this._socket.on('connection', function (client) {
          self._connection(client);
        });
      });
    }
  }, {
    key: '_close',
    value: function _close() {
      var _this2 = this;

      this._socket.close(function () {
        console.log('server(' + _this2._socket.address().address + ':' + _this2._socket.address().port + ') closed');
      });
    }
  }, {
    key: '_connection',
    value: function _connection(clientSocket) {
      console.log('connected client(' + clientSocket.address().address + ':' + clientSocket.address().port + ')');
      this._chattingManager.enterClient(clientSocket);
    }
  }]);

  return Server;
}();

Server.port = 1000;
Server.host = '127.0.0.1';
Server.backlog = 5;
Server.optionNames = { port: 'port', host: 'host', backlog: 'backlog' };
module.exports = Server;
//# sourceMappingURL=server.js.map
