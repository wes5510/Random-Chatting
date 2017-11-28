class Message{
  constructor(to, from, text){
    this._to = to;
    this._from = from;
    this._text = text;
  }
  getText(){
    return this._text.concat();
  }
}
module.exports = Message;