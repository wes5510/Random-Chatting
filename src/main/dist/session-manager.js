'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Session = require('./session.js');
var _sessions = Symbol();
var _partnerMap = Symbol();

var SessionManager = function () {
	function SessionManager() {
		_classCallCheck(this, SessionManager);

		this[_sessions] = new Map();
		this[_partnerMap] = new Map();
	}

	_createClass(SessionManager, [{
		key: 'addSession',
		value: function addSession(cliSocket, events) {
			var session = new Session(cliSocket, events);
			this[_sessions].set(session.id, session);
			return session;
		}
	}, {
		key: 'setPartnerById',
		value: function setPartnerById(id) {
			var partnerId = this._findPartner();
			if (partnerId) {
				this[_partnerMap].set(partnerId, id);
				this[_partnerMap].set(id, partnerId);
				return true;
			}
			this[_partnerMap].set(id, SessionManager.SERVERID);
			return false;
		}
	}, {
		key: '_findPartner',
		value: function _findPartner() {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this[_partnerMap][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var _step$value = _slicedToArray(_step.value, 2),
					    sessionId = _step$value[0],
					    partnerId = _step$value[1];

					if (partnerId === SessionManager.SERVERID) return sessionId;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return false;
		}
	}, {
		key: 'getPartnerIdById',
		value: function getPartnerIdById(id) {
			return this[_partnerMap].get(id);
		}
	}, {
		key: 'getSessionById',
		value: function getSessionById(id) {
			return this[_sessions].get(id);
		}
	}, {
		key: 'destroySessionById',
		value: function destroySessionById(id) {
			var session = this[_sessions].get(id);
			if (session) {
				session.close();
				this[_sessions].delete(id);
				this[_partnerMap].delete(id);
			}
		}
	}]);

	return SessionManager;
}();

SessionManager.SERVERID = 'system';

module.exports = SessionManager;
//# sourceMappingURL=session-manager.js.map
