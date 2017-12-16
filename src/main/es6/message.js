const _to = Symbol();
const _from = Symbol();
const _text = Symbol();
class Message{
  constructor(to, from, text){
    this[_to] = to;
    this[_from] = from;
    this[_text] = text;
  }
  get to(){
    return this[_to];
  }
  get from(){
    return this[_from];
  }
  get text(){
    return this[_text];
  }
  appendText(text){
    this[_text] += text;
  }
}

module.exports = Message;
