const Message = require('./message.js'), Session = require('./session.js');
class Server{
  constructor(socket, options){
    this._socket = socket;
    this._sessions = new Map();
    if(options){
      this._port = (options[Server.optionNames.port])?  options[Server.optionNames.port] : Server.port;
      this._host = (options[Server.optionNames.host])?  options[Server.optionNames.host] : Server.host;
    }
    else{
      this._port = Server.port;
      this._host = Server.host;
    }
  }
  run(){
    let self = this;
    self._socket.listen(self._port, self._host, 5, ()=>{
      console.log(`server(${self._socket.address().address}:${self._socket.address().port}) bound`);
      this._socket.on('connection', (client)=>{self._connection(client);});
    });
  }
  _close(){
    this._socket.close(()=>{
      console.log(`server(${this._socket.address().address}:${this._socket.address().port}) closed`);
    });
  }
  _connection(cliSocket){
    console.log(`connected client(${cliSocket.address().address}:${cliSocket.address().port})`);
    let session = new Session(cliSocket), welcomMsg = new Message(`${session.getId()}`, 'host', Server.welcomeMsg);
    this._addSession(session);
    session.send(welcomMsg._text);
  }
  _addSession(session){
    if(this._sessions.has(session.getId()) && !this._sessions.get(session.getId()).destroyed){
      this._sessions.get(session.getId()).destroy();
    }
    this._sessions.set(session.getId(), session);
  }
}
Server.port = 1000;
Server.host = '127.0.0.1';
Server.welcomeMsg = 'Welcome!!!';
Server.optionNames = { port: 'port', host: 'host' };
module.exports = Server;