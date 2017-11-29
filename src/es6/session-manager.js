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
  setPartner(session){
    let partnerId = this._findPartner();
		console.log(`setPartner partnerId: ${partnerId}`);
    if(partnerId){
      this._partnerMap.set(partnerId, session.getId());
      this._partnerMap.set(session.getId(), partnerId);
      return true;
    }
    this._partnerMap.set(session.getId(), SessionManager.SERVERID);
    return false;
  }
  _findPartner(){
    for(let [sessionId, partnerId] of this._partnerMap){
			console.log(`_findPartner, sessionId: ${sessionId} , partnerId: ${partnerId}`);
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
		}
	}
}
SessionManager.SERVERID = 'system';

module.exports=SessionManager;
