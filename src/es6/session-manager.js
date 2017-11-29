const Session = require('./session.js');
class SessionManager{
	constructor(){
		this._sessions = new Map();
		this._partnerMap = new Map();
	}
	addSession(cliSocket, events){
		let session = new Session(cliSocket, events);
		this._sessions.set(session.getId(), session);
		return session;
	}
	setPartnerById(id){
		let partnerId = this._findPartner();
		if(partnerId){
			this._partnerMap.set(partnerId, id);
			this._partnerMap.set(id, partnerId);
			return true;
		}
		this._partnerMap.set(id, SessionManager.SERVERID);
		return false;
	}
	_findPartner(){
		for(let [sessionId, partnerId] of this._partnerMap){
			if(partnerId === SessionManager.SERVERID) return sessionId;
		}
		return false;
	}
	getPartnerIdById(id){
		return this._partnerMap.get(id);
	}
	getSessionById(id){
		return this._sessions.get(id);
	}
	destroySessionById(id){
		let session = this._sessions.get(id);
		if(session){
			session.close();
			this._sessions.delete(id);
			this._partnerMap.delete(id);
		}
	}
}
SessionManager.SERVERID = 'system';

module.exports=SessionManager;
