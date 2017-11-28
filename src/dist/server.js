'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = require('./message.js'),
    Session = require('./session.js');

var Server = function () {
  function Server(socket, options) {
    _classCallCheck(this, Server);

    this._socket = socket;
    this._sessions = new Map();
    if (options) {
      this._port = options[Server.optionNames.port] ? options[Server.optionNames.port] : Server.port;
      this._host = options[Server.optionNames.host] ? options[Server.optionNames.host] : Server.host;
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
      self._socket.listen(self._port, self._host, 5, function () {
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
    value: function _connection(cliSocket) {
      console.log('connected client(' + cliSocket.address().address + ':' + cliSocket.address().port + ')');
      var session = new Session(cliSocket),
          welcomMsg = new Message('' + session.getId(), 'host', Server.welcomeMsg);
      this._addSession(session);
      session.send(welcomMsg._text);
    }
  }, {
    key: '_addSession',
    value: function _addSession(session) {
      if (this._sessions.has(session.getId()) && !this._sessions.get(session.getId()).destroyed) {
        this._sessions.get(session.getId()).destroy();
      }
      this._sessions.set(session.getId(), session);
    }
  }]);

  return Server;
}();

Server.port = 1000;
Server.host = '127.0.0.1';
Server.welcomeMsg = 'Welcome!!!';
Server.optionNames = { port: 'port', host: 'host' };
module.exports = Server;
//# sourceMappingURL=server.js.map
