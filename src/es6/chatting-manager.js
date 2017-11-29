const SessionManager = require('./session-manager.js'), Message = require('./message.js');
class ChattingManager{
	constructor(){
		this._sessionManager = new SessionManager();
		this._events = {
			close :(id, had_error)=>{
				console.log(`?close session(${id}), had error(${had_error})`);
				this._sessionManager.destroySessionById(id);
			},
			error :(id, error)=>{
				console.log(`?error(${error}) session(${id})`);
				this._sessionManager.destroySessionById(id);
			},
			data :(id, buf)=>{
				console.log(`?data(${buf}) session(${id})`);
				const partnerId = this._sessionManager.getPartnerIdById(id);
				let msg;
				if(partnerId !== SessionManager.SERVERID) msg = new Message(partnerId, id, buf);
				else msg = new Message(id, SessionManager.SERVERID, ChattingManager.WAITING_TEXT); 
				this._send(msg);
			},
			drain :(id)=>{
				console.log(`?drain session(${id})`);
			},
			end :(id)=>{
				console.log(`?end session(${id})`);
			},
			timeout :(id)=>{
				console.log(`?timeout session(${id})`);
				this._sessionManager.destroySessionById(id);
			}
		};
	}
	enterClient(clientSocket){
		const session = this._sessionManager.addSession(clientSocket, this._events)
			, welcomeText = `${ChattingManager.WELCOME_TEXT} ${session.getId()} user.\n`
			, msg = new Message(session.getId(), SessionManager.SERVERID, welcomeText);
		if(this._sessionManager.setPartner(session))
			msg.appendText(`Found user(${this._sessionManager.getPartnerIdById(session.getId())}) to chatting. Enjoy chatting^^\n`);
		else
			msg.appendText(ChattingManager.WAITING_TEXT);
		this._send(msg);
	}
	_send(msg, callback){
		if(!callback)
			callback = ()=>{
				console.log(`user(${msg.getFrom()}) -> user(${msg.getTo()}), Sended message(${msg.getText()})`);
			};
		this._sessionManager
			.getSessionById(msg.getTo())
			.getSocket()
			.write(`user(${msg.getFrom()}) -> user(${msg.getTo()}): ${msg.getText()}`, ChattingManager.ENCODING, callback);
	}
}

ChattingManager.WELCOME_TEXT = 'Welcome!!!';
ChattingManager.WAITING_TEXT = 'Can\'t found other user to chatting. Please wait....\n';
ChattingManager.ENCODING = 'utf8';
module.exports=ChattingManager;
