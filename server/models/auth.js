/*
/ Rick Fox
/ 01-06-22
/ Auth db model controller
*/

const getConnection = require("../connectors/pool");

module.exports = {
	createUser: async ({ email, password, salt, firstname, lastname }) => {
		return new Promise(async (resolve, reject) => {
			// get a connection from the db pool
			getConnection()
				.then(async (connection) => {
					try {
						const res = await connection.query(
							`INSERT into users (email, password_hash, salt, firstname, lastname) VALUES($1,$2,$3,$4,$5) RETURNING id`,
							[email, password, salt, firstname, lastname]
						);
						// console.log(res);
						resolve({ ...res.rows[0] });
					} finally {
						// release the db connection
						connection.release();
					}
				})
				.catch((e) => {
					console.log("error", e);
					reject();
				});
		});
	},
	getUserByEmail: async (email) => {
		return new Promise(async (resolve, reject) => {
			// get a connection from the db pool
			getConnection()
				.then(async (connection) => {
					try {
						const res = await connection.query(
							`SELECT * FROM users WHERE email = $1`,
							[email]
						);
						// console.log(res.rows);
						resolve({ ...res.rows[0] });
					} finally {
						// release the db connection
						connection.release();
					}
				})
				.catch((e) => {
					console.log("error", e);
					reject();
				});
		});
	},
};
