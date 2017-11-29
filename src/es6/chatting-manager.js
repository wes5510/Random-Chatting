const SessionManager = require('./session-manager.js'), Message = require('./message.js');
class ChattingManager{
	constructor(){
		this._sessionManager = new SessionManager();
		this._events = {
			close :(id, had_error)=>{
				console.log(`?close session(${id}), had error(${had_error})`);
				let partnerId = this._sessionManager.getPartnerIdById(id);
				this._sessionManager.destroySessionById(id);
				this._reconnectPartnerById(partnerId);
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
		this._send(msg);
		this._connectPartnerById(session.getId());
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
	_connectPartnerById(id){
		let text;
		if(this._sessionManager.setPartnerById(id))
			text=`Found user(${this._sessionManager.getPartnerIdById(id)}) to chatting. Enjoy chatting^^\n`;
		else
			text=ChattingManager.WAITING_TEXT;
		this._send(new Message(id, SessionManager.SERVERID, text));
	}
	_reconnectPartnerById(id){
		this._send(new Message(id, SessionManager.SERVERID, 'your partner is gone. we are finding new partner...'));
		this._connectPartnerById(id);
	}
}

ChattingManager.WELCOME_TEXT = 'Welcome!!!';
ChattingManager.WAITING_TEXT = 'Can\'t found other user to chatting. Please wait....\n';
ChattingManager.ENCODING = 'utf8';
module.exports=ChattingManager;
