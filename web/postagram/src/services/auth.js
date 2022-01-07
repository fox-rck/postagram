/*
/ Rick Fox
/ 01-06-22
/ Auth service
*/
import api from "../connectors/api";

let auth = {
	cb: () => {}, // empty handler
	authedUser: null,
	// initalize the auth object connecting the high-level app
	init: (cb) => {
		// set the cb to the service
		auth.cb = cb;
		// invoke the cb
		auth.cb();
	},
	// allow a user to authenticate
	signIn: (email, password) => {
		return new Promise(async (resolve, reject) => {
			try {
				// Try to authenticate the user
				let authedUser = await api.signIn({ email, password });
				// save the authed user to the service
				auth.authedUser = authedUser;
				resolve({ status: "success", ...authedUser });
				auth.cb();
			} catch (e) {
				console.log("error", e);
				// clear the authed user
				auth.authedUser = null;
				reject({ status: "error" });
			}
		});
	},
	// allow a user to register
	register: (username, email, password) => {
		return new Promise(async (resolve, reject) => {
			try {
				// Try to register the user & auto auth
				let authedUser = await api.register({
					username,
					email,
					password,
				});
				// save the auto authed user to the service
				auth.authedUser = authedUser;
				resolve({ status: "success", ...authedUser });
				auth.cb();
			} catch (e) {
				console.log("error", e);
				// clear the authed user
				auth.authedUser = null;
				reject({ status: "error" });
			}
		});
	},
	// allow a user to de-authenticate
	signOut: () => {},
	// Reset the service back to defaults
	destroy: () => {
		auth.cb = () => {};
		auth.authedUser = null;
	},
};

export default auth;
