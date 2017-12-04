const SessionManager = require('./session-manager.js'), Message = require('./message.js');
class ChattingManager{
	constructor(){
		this._sessionManager = new SessionManager();
		this._events = {
			close :(id, had_error)=>{
				console.log(`close session(${id}), had error(${had_error})`);
				let partnerId = this._sessionManager.getPartnerIdById(id);
				this._sessionManager.destroySessionById(id);
				if(partnerId !== SessionManager.SERVERID)this._reconnectPartnerById(partnerId);
			},
			error :(id, error)=>{
				console.log(`error(${error}) session(${id})`);
				this._sessionManager.destroySessionById(id);
			},
			data :(id, buf)=>{
				console.log(`data(${buf}) session(${id})`);
				const partnerId = this._sessionManager.getPartnerIdById(id);
				let msg;
				if(partnerId !== SessionManager.SERVERID) msg = new Message(partnerId, id, buf);
				else msg = new Message(id, SessionManager.SERVERID, ChattingManager.WAITING_TEXT); 
				this._send(msg);
			},
			drain :(id)=>{
				console.log(`drain session(${id})`);
			},
			end :(id)=>{
				console.log(`end session(${id})`);
			},
			timeout :(id)=>{
				console.log(`timeout session(${id})`);
				this._sessionManager.destroySessionById(id);
			}
		};
	}
	enterClient(clientSocket){
		const session = this._sessionManager.addSession(clientSocket, this._events)
			, welcomeText = `${ChattingManager.WELCOME_TEXT} ${session.id} user.\n`
			, msg = new Message(session.id, SessionManager.SERVERID, welcomeText);
		this._send(msg);
		this._connectPartnerById(session.id);
	}
	_send(msg, callback){
		if(!callback)
			callback = ()=>{
				console.log(`user(${msg.from}) -> user(${msg.to}), Sended message(${msg.text})`);
			};
		this._sessionManager
			.getSessionById(msg.to)
			.socket
			.write(`user(${msg.from}) -> user(${msg.to}): ${msg.text}`, ChattingManager.ENCODING, callback);
	}
	_connectPartnerById(id){
		let text;
		if(this._sessionManager.setPartnerById(id)){
			let partnerId = this._sessionManager.getPartnerIdById(id);
			text=`Found user(${partnerId}) to chatting. Enjoy chatting^^\n`;
			this._send(new Message(partnerId, SessionManager.SERVERID, `Found user(${id}) to chatting. Enjoy chatting^^\n`));
		}
		else{
			text=ChattingManager.WAITING_TEXT;
		}
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
