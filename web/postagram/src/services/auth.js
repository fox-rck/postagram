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
	, signIn: (email, password)=> {
		return new Promise(async (resolve, reject)=>{
			try {
				// Try to authenticate the user
				let authedUser = await api.signin({email, password})
				// save the authed user to the service
				auth.authedUser = authedUser;
				resolve({status: 'success', ...authedUser})
			} catch (e) {
				console.log('error', e)
				// clear the authed user
				auth.authedUser = null;
				reject({status: 'error'})

			}
		})
	}
	// allow a user to de-authenticate
	, signOut: ()=> {

	}
}

export default auth;