'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SessionManager = require('./session-manager.js'),
    Message = require('./message.js');

var ChattingManager = function () {
	function ChattingManager() {
		var _this = this;

		_classCallCheck(this, ChattingManager);

		this._sessionManager = new SessionManager();
		this._events = {
			close: function close(id, had_error) {
				console.log('close session(' + id + '), had error(' + had_error + ')');
				var partnerId = _this._sessionManager.getPartnerIdById(id);
				_this._sessionManager.destroySessionById(id);
				if (partnerId !== SessionManager.SERVERID) _this._reconnectPartnerById(partnerId);
			},
			error: function error(id, _error) {
				console.log('error(' + _error + ') session(' + id + ')');
				_this._sessionManager.destroySessionById(id);
			},
			data: function data(id, buf) {
				console.log('data(' + buf + ') session(' + id + ')');
				var partnerId = _this._sessionManager.getPartnerIdById(id);
				var msg = void 0;
				if (partnerId !== SessionManager.SERVERID) msg = new Message(partnerId, id, buf);else msg = new Message(id, SessionManager.SERVERID, ChattingManager.WAITING_TEXT);
				_this._send(msg);
			},
			drain: function drain(id) {
				console.log('drain session(' + id + ')');
			},
			end: function end(id) {
				console.log('end session(' + id + ')');
			},
			timeout: function timeout(id) {
				console.log('timeout session(' + id + ')');
				_this._sessionManager.destroySessionById(id);
			}
		};
	}

	_createClass(ChattingManager, [{
		key: 'enterClient',
		value: function enterClient(clientSocket) {
			var session = this._sessionManager.addSession(clientSocket, this._events),
			    welcomeText = ChattingManager.WELCOME_TEXT + ' ' + session.id + ' user.\n',
			    msg = new Message(session.id, SessionManager.SERVERID, welcomeText);
			this._send(msg);
			this._connectPartnerById(session.id);
		}
	}, {
		key: '_send',
		value: function _send(msg, callback) {
			if (!callback) callback = function callback() {
				console.log('user(' + msg.from + ') -> user(' + msg.to + '), Sended message(' + msg.text + ')');
			};
			this._sessionManager.getSessionById(msg.to).socket.write('user(' + msg.from + ') -> user(' + msg.to + '): ' + msg.text, ChattingManager.ENCODING, callback);
		}
	}, {
		key: '_connectPartnerById',
		value: function _connectPartnerById(id) {
			var text = void 0;
			if (this._sessionManager.setPartnerById(id)) {
				var partnerId = this._sessionManager.getPartnerIdById(id);
				text = 'Found user(' + partnerId + ') to chatting. Enjoy chatting^^\n';
				this._send(new Message(partnerId, SessionManager.SERVERID, 'Found user(' + id + ') to chatting. Enjoy chatting^^\n'));
			} else {
				text = ChattingManager.WAITING_TEXT;
			}
			this._send(new Message(id, SessionManager.SERVERID, text));
		}
	}, {
		key: '_reconnectPartnerById',
		value: function _reconnectPartnerById(id) {
			this._send(new Message(id, SessionManager.SERVERID, 'your partner is gone. we are finding new partner...'));
			this._connectPartnerById(id);
		}
	}]);

	return ChattingManager;
}();

ChattingManager.WELCOME_TEXT = 'Welcome!!!';
ChattingManager.WAITING_TEXT = 'Can\'t found other user to chatting. Please wait....\n';
ChattingManager.ENCODING = 'utf8';
module.exports = ChattingManager;
//# sourceMappingURL=chatting-manager.js.map
