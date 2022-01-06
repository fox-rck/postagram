/*
/ Rick Fox
/ 01-06-22
/ Auth db controller
*/

const getConnection = require('../connectors/pool');

module.exports = {
	createUser: async ({email, password, salt, firstname, lastname}) =>{
		return new Promise(async (resolve, reject) =>{ 
			// get a connection from the db pool
			getConnection()
			.then(async (connection)=>{
				// release the db connection
				connection.release()
			})
			.catch((e)=>{
				reject()
			})
		});
	},
	getUserByEmail: async (email) =>{
		return new Promise(async (resolve, reject) =>{ 
			// get a connection from the db pool
			getConnection()
			.then(async (connection)=>{
				// release the db connection
				connection.release()
			})
			.catch((e)=>{
				reject()
			})
		});
	},
}