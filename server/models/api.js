/*
/ Rick Fox
/ 01-06-22
/ Api db model controller
*/

const getConnection = require("../connectors/pool");

module.exports = {
	getPosts: async (count, next_id) => {
		return new Promise(async (resolve, reject) => {
			// get a connection from the db pool
			getConnection()
				.then(async (connection) => {
					try {
						let params = [
								count + 1, // get one more than needed for the next _id
							],
							query = "SELECT * FROM posts";

						if (next_id) {
							params.push(next_id); // will be the 2 param
							query += " WHERE id <= $2";
						}
						// add pagination
						query += " ORDER BY date_created DESC LIMIT $1";

						// console.log('params', params, query)

						const res = await connection.query(query, params);

						// get the next mod id if it exists for pagination of the next page
						const nextMod = res.rows[count];

						// check if it exists
						if (nextMod) {
							// remove the extra item we grabbed for the next id
							res.rows = res.rows.slice(0, -1); // remove the last one
						}

						// send the items and the next id
						resolve({
							next_id: nextMod ? nextMod.id : null,
							data: res.rows,
						});
					} finally {
						// release the db connection
						connection.release();
					}
				})
				.catch((e) => {
					console.log("catch e", e);
					reject();
				});
		});
	},
	getPostById: async (postId) => {
		return new Promise(async (resolve, reject) => {
			// get a connection from the db pool
			getConnection()
				.then(async (connection) => {
					try {
						const res = await connection.query(
							`SELECT * FROM posts WHERE id = $1`,
							[postId]
						);
						// console.log(res.rows);
						resolve({ data: res.rows[0] });
					} finally {
						// release the db connection
						connection.release();
					}
				})
				.catch((e) => {
					reject();
				});
		});
	},
	addPost: async (userId, title, body) => {
		console.log("addPost");
		return new Promise(async (resolve, reject) => {
			// get a connection from the db pool
			getConnection()
				.then(async (connection) => {
					try {
						const res = await connection.query(
							`INSERT into posts (user_id, title, body) VALUES($1,$2,$3) RETURNING id`,
							[userId, title, body]
						);
						// console.log(res);
						resolve({ ...res.rows[0] });
					} finally {
						// release the db connection
						connection.release();
					}
				})
				.catch((e) => {
					reject();
				});
		});
	},
	addPostComment: async (userId, postId, body) => {
		console.log("addPostComment");
		return new Promise(async (resolve, reject) => {
			// get a connection from the db pool
			getConnection()
				.then(async (connection) => {
					try {
						const res = await connection.query(
							`INSERT into comments (user_id, post_id, body) VALUES($1,$2,$3) RETURNING id`,
							[userId, postId, body]
						);
						// console.log(res);
						resolve({ ...res.rows[0] });
					} finally {
						// release the db connection
						connection.release();
					}
				})
				.catch((e) => {
					reject();
				});
		});
	},
	getPostComments: async (postId, count, next_id) => {
		console.log("getPostComments");
		return new Promise(async (resolve, reject) => {
			// get a connection from the db pool
			getConnection()
				.then(async (connection) => {
					try {
						let params = [postId, count + 1],
							query = "SELECT * FROM comments WHERE post_id = $1";

						if (next_id) {
							params.push(next_id); // will be the 2 param
							query += " AND id >= $3";
						}
						// add pagination
						query += " ORDER BY date_created ASC LIMIT $2";

						const res = await connection.query(query, params);
						// console.log(res.rows);
						// get the next mod id if it exists for pagination of the next page
						const nextMod = res.rows[count];

						// check if it exists
						if (nextMod) {
							// remove the extra item we grabbed for the next id
							res.rows = res.rows.slice(0, -1); // remove the last one
						}

						// send the items and the next id
						resolve({
							next_id: nextMod ? nextMod.id : null,
							data: res.rows,
						});
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
