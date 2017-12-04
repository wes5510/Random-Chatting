const ChattingManager = require('./chatting-manager.js');
class Server{
  constructor(socket, options){
    this._socket = socket;
    this._chattingManager = new ChattingManager();
		this._port = Server.port;
		this._host = Server.host;
		this._backlog = Server.backlog;
		if(options){
			if(options[Server.optionNames.port]) this._port = options[Server.optionNames.port];
			if(options[Server.optionNames.host]) this._host = options[Server.optionNames.host];
			if(options[Server.optionNames.backlog]) this._backlog = options[Server.optionNames.backlog];
		}
  }
  run(){
    this._socket.listen(this._port, this._host, this._backlog, ()=>{
      console.log(`server(${this._socket.address().address}:${this._socket.address().port}) bound`);
      this._socket.on('connection', (client)=>{this._connection(client);});
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
