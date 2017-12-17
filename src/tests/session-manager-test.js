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
	
	describe('#setPartnerById(id)', function() {
    it('should set partner system when don\'t exists parter without error', function() {
			var sessionManager = new SessionManager();
			var session = sessionManager.addSession(null, null);
			assert(sessionManager.setPartnerById(session.id) === false);
			assert(sessionManager.getPartnerIdById(session.id) === SessionManager.SERVERID);
    });
		it('should return session object by id without error', function() {
			var sessionManager = new SessionManager();
			var session = sessionManager.addSession(null, null);
			assert.deepEqual(sessionManager.getSessionById(session.id), session);
    });
		it('should set partner system id when exists some parter without error', function() {
			var sessionManager = new SessionManager();
			var session1 = sessionManager.addSession(null, null), session2 = sessionManager.addSession(null, null);
			
			assert(sessionManager.setPartnerById(session1.id) === false);
			assert(sessionManager.setPartnerById(session2.id) === true);
			
			assert(sessionManager.getPartnerIdById(session1.id) === session2.id);
			assert(sessionManager.getPartnerIdById(session2.id) === session1.id);
    });
  });
});