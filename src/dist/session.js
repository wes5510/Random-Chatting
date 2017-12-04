'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _id = Symbol();
var _socket = Symbol();

var Session = function () {
  function Session(socket, events) {
    _classCallCheck(this, Session);

    this[_id] = Session.SEQ++;
    this[_socket] = socket;
    this._setEvent(events);
  }

  _createClass(Session, [{
    key: '_setEvent',
    value: function _setEvent(events) {
      var _this = this;

      if (events) {
        var _loop = function _loop(eventNameKey) {
          if (Session.EVENT_NAMES[eventNameKey] === 'close' || Session.EVENT_NAMES[eventNameKey] === 'error' || Session.EVENT_NAMES[eventNameKey] === 'data') {
            if (events[Session.EVENT_NAMES[eventNameKey]]) _this[_socket].on(Session.EVENT_NAMES[eventNameKey], function (data) {
              events[Session.EVENT_NAMES[eventNameKey]](_this[_id], data);
            });else _this[_socket].on(Session.EVENT_NAMES[eventNameKey], function (data) {
              Session.DEFAULT_EVENT[eventNameKey](_this[_id], data);
            });
          } else {
            if (events[Session.EVENT_NAMES[eventNameKey]]) _this[_socket].on(Session.EVENT_NAMES[eventNameKey], function () {
              events[Session.EVENT_NAMES[eventNameKey]](_this[_id]);
            });else _this[_socket].on(Session.EVENT_NAMES[eventNameKey], function () {
              Session.DEFAULT_EVENT[eventNameKey](_this[_id]);
            });
          }
        };

        for (var eventNameKey in Session.EVENT_NAMES) {
          _loop(eventNameKey);
        }
      }
    }
  }, {
    key: 'close',
    value: function close() {
      if (!this[_socket].destroyed) this[_socket].destroy();
    }
  }, {
    key: 'id',
    get: function get() {
      return this[_id];
    }
  }, {
    key: 'socket',
    get: function get() {
      return this[_socket];
    }
  }]);

  return Session;
}();

Session.SEQ = 1;
Session.EVENT_NAMES = {
  CLOSE: 'close',
  ERROR: 'error',
  DATA: 'data',
  DRAIN: 'drain',
  END: 'end',
  TIMEOUT: 'timeout'
};
Session.DEFAULT_EVENT = {
  CLOSE: function CLOSE(id, had_error) {
    console.log('close session(' + id + '), had error(' + had_error + ')');
  },
  ERROR: function ERROR(id, error) {
    console.log('error(' + error + ') session(' + id + ')');
  },
  DATA: function DATA(id, buf) {
    console.log('data(' + buf + ') session(' + id + ')');
  },
  DRAIN: function DRAIN(id) {
    console.log('drain session(' + id + ')');
  },
  END: function END(id) {
    console.log('end session(' + id + ')');
  },
  TIMEOUT: function TIMEOUT(id) {
    console.log('timeout session(' + id + ')');
  }
};
module.exports = Session;
//# sourceMappingURL=session.js.map
