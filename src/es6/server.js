const ChattingManager = require('./chatting-manager.js');
class Server{
  constructor(socket, options){
    this._socket = socket;
    this._chattingManager = new ChattingManager();
    if(options){
      this._port = (options[Server.optionNames.port])?  options[Server.optionNames.port] : Server.port;
      this._host = (options[Server.optionNames.host])?  options[Server.optionNames.host] : Server.host;
      this._backlog = (options[Server.optionNames.backlog])?  options[Server.optionNames.backlog] : Server.backlog;
    }
    else{
      this._port = Server.port;
      this._host = Server.host;
    }
  }
  run(){
    let self = this;
    self._socket.listen(self._port, self._host, self._backlog, ()=>{
      console.log(`server(${self._socket.address().address}:${self._socket.address().port}) bound`);
      this._socket.on('connection', (client)=>{self._connection(client);});
    });
  }
  _close(){
    this._socket.close(()=>{
      console.log(`server(${this._socket.address().address}:${this._socket.address().port}) closed`);
    });
  }
  _connection(clientSocket){
    console.log(`connected client(${clientSocket.address().address}:${clientSocket.address().port})`);
    this._chattingManager.enterClient(clientSocket);
  }
}
Server.port = 1000;
Server.host = '127.0.0.1';
Server.backlog = 5;
Server.optionNames = { port: 'port', host: 'host', backlog: 'backlog' };
module.exports = Server;