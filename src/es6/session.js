class Session{
  constructor(socket){
    this._id = Session.SEQ++;
    this._socket = socket;
    this._init();
  }
  _init(){
    this._socket.on('close', (had_error) => {this._close.call(had_error);});
    this._socket.on('error', (error) => {this._error(error);});
    this._socket.on('data', (buf)=>{this._data(buf);});
    this._socket.on('drain', ()=>{this._drain()});
    this._socket.on('end', ()=>{this._end});
    this._socket.on('timeout', ()=>{this._timeout});
  }
  getId(){
    return this._id;
  }
  send(text, callback){
    if(!callback) callback = ()=>{ console.log(`sended text(${text}) to session(${this._id})`);};
    this._socket.write(text, Session.ENCODING, callback);
  }
  _close(had_error){
    console.log(`close session(${this._id}), had error(${had_error})`);
  }
  _error(error){
    console.log(`error(${error}) session(${this._id})`);
  }
  _data(buf){
    console.log(`data(${buf}) session(${this._id})`);
  }
  _drain(){
    console.log(`drain session(${this._id})`);
  }
  _end(){
    console.log(`end session(${this._id})`);
  }
  _timeout(){
    console.log(`timeout session(${this._id})`);
  }
}
Session.ENCODING = 'utf8';
Session.SEQ = 0;
module.exports = Session;
