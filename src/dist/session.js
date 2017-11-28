'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Session = function () {
  function Session(socket) {
    _classCallCheck(this, Session);

    this._id = Session.SEQ++;
    this._socket = socket;
    this._init();
  }

  _createClass(Session, [{
    key: '_init',
    value: function _init() {
      var _this = this;

      this._socket.on('close', function (had_error) {
        _this._close.call(had_error);
      });
      this._socket.on('error', function (error) {
        _this._error(error);
      });
      this._socket.on('data', function (buf) {
        _this._data(buf);
      });
      this._socket.on('drain', this._drain);
      this._socket.on('end', this._end);
      this._socket.on('timeout', this._timeout);
    }
  }, {
    key: 'getId',
    value: function getId() {
      return this._id;
    }
  }, {
    key: 'send',
    value: function send(text, callback) {
      var _this2 = this;

      if (!callback) callback = function callback() {
        console.log('sended text(' + text + ') to session(' + _this2._id + ')');
      };
      this._socket.write(text, Session.ENCODING, callback);
    }
  }, {
    key: '_close',
    value: function _close(had_error) {
      console.log('close session(' + this._id + '), had error(' + had_error + ')');
    }
  }, {
    key: '_error',
    value: function _error(error) {
      console.log('error(' + error + ') session(' + this._id + ')');
    }
  }, {
    key: '_data',
    value: function _data(buf) {
      console.log('data(' + buf + ') session(' + this._id + ')');
    }
  }, {
    key: '_drain',
    value: function _drain() {
      console.log('drain session(' + this._id + ')');
    }
  }, {
    key: '_end',
    value: function _end() {
      console.log('end session(' + this._id + ')');
    }
  }, {
    key: '_timeout',
    value: function _timeout() {
      console.log('timeout session(' + this._id + ')');
    }
  }]);

  return Session;
}();

Session.ENCODING = 'utf8';
Session.SEQ = 0;
module.exports = Session;
//# sourceMappingURL=session.js.map
