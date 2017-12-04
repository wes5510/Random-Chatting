const _id = Symbol();
const _socket = Symbol();
class Session{
  constructor(socket, events){
    this[_id] = Session.SEQ++;
    this[_socket] = socket;
    this._setEvent(events);
  }
  _setEvent(events){
    if(events) {
      for (let eventNameKey in Session.EVENT_NAMES) {
        if (Session.EVENT_NAMES[eventNameKey] === 'close' 
					|| Session.EVENT_NAMES[eventNameKey] === 'error' 
					|| Session.EVENT_NAMES[eventNameKey] === 'data') {
          if (events[Session.EVENT_NAMES[eventNameKey]]) 
						this[_socket].on(Session.EVENT_NAMES[eventNameKey],
							(data) => {events[Session.EVENT_NAMES[eventNameKey]](this[_id], data);});
          else 
						this[_socket].on(Session.EVENT_NAMES[eventNameKey],
							(data) => {Session.DEFAULT_EVENT[eventNameKey](this[_id], data);});
        } else {
          if (events[Session.EVENT_NAMES[eventNameKey]]) 
						this[_socket].on(Session.EVENT_NAMES[eventNameKey],
							() => {events[Session.EVENT_NAMES[eventNameKey]](this[_id]);});
          else 
						this[_socket].on(Session.EVENT_NAMES[eventNameKey],
							() => {Session.DEFAULT_EVENT[eventNameKey](this[_id]);});
        }
      }
    }
  }
  get id(){
    return this[_id];
  }
  get socket(){
    return this[_socket];
  }
	close(){
		if(!this[_socket].destroyed) 
			this[_socket].destroy();
	}
}

Session.SEQ = 1;
Session.EVENT_NAMES = { 
	CLOSE: 'close',
	ERROR: 'error',
	DATA: 'data',
	DRAIN: 'drain',
	END: 'end',
	TIMEOUT: 'timeout' 
};
Session.DEFAULT_EVENT = {
  CLOSE: (id, had_error)=>{ console.log(`close session(${id}), had error(${had_error})`); },
  ERROR: (id, error)=>{ console.log(`error(${error}) session(${id})`); },
  DATA: (id, buf)=>{ console.log(`data(${buf}) session(${id})`); },
  DRAIN: (id)=>{ console.log(`drain session(${id})`); },
  END: (id)=> {console.log(`end session(${id})`); },
  TIMEOUT: (id)=>{ console.log(`timeout session(${id})`); }
};
module.exports = Session;
