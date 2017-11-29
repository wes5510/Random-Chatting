class Message{
  constructor(to, from, text){
    this._to = to;
    this._from = from;
    this._text = text;
  }
  getTo(){
    return this._to;
  }
  getFrom(){
    return this._from;
  }
  getText(){
    return this._text;
  }
  appendText(text){
    this._text += text;
  }
}

module.exports = Message;