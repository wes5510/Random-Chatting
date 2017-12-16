var assert = require('assert'), SessionManager = require('../main/dist/session-manager.js'), Session = require('../main/dist/session.js');
describe('SessionManager', function() {
	before(function() {
		// excuted before test suite
	});

	after(function() {
		// excuted after test suite
	});

	beforeEach(function() {
		// excuted before every test
	});

	afterEach(function() {
		// excuted after every test
	});

	describe('#addSession()', function() {
    it('should make nuew session and add session without error', function() {
			var sessionManager = new SessionManager();
			var session = sessionManager.addSession(null, null);
			assert.equal(session.socket, null);
			assert(typeof session.id === 'number');
    });
  });
});