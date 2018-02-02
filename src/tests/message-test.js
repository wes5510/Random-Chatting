var Message = require('../main/dist/message.js'), assert = require('assert');
describe('MessageTest', function() {
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

	describe('#appendText()', function() {
    it('should text of message is appended "3" when call appendText("3")', function() {
			var message = new Message('to', 'from', 'text');
			message.appendText('3');
			assert.equal(message.text, 'text3');
    });
  });
});