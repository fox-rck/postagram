/*
/ Rick Fox
/ 01-06-22
/ Auth service
*/
import api from '../connectors/api';

let auth = {
	cb: ()=>{}, // empty handler
	authedUser: null,
	// initalize the auth object connecting the high-level app
	init: (cb) =>{
		// set the cb to the service
		auth.cb = cb
		// invoke the cb
		auth.cb()
	}
	// allow a user to authenticate
	, signin: ()=> {

	}
	// allow a user to de-authenticate
	, signOut: ()=> {

	}
}

export default auth;