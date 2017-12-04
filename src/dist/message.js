"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _to = Symbol();
var _from = Symbol();
var _text = Symbol();

var Message = function () {
  function Message(to, from, text) {
    _classCallCheck(this, Message);

    this[_to] = to;
    this[_from] = from;
    this[_text] = text;
  }

  _createClass(Message, [{
    key: "appendText",
    value: function appendText(text) {
      this[_text] += text;
    }
  }, {
    key: "to",
    get: function get() {
      return this[_to];
    }
  }, {
    key: "from",
    get: function get() {
      return this[_from];
    }
  }, {
    key: "text",
    get: function get() {
      return this[_text];
    }
  }]);

  return Message;
}();

module.exports = Message;
//# sourceMappingURL=message.js.map
