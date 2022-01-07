/*
/ Rick Fox
/ 01-06-22
/ Api connector
*/

import config from "../config";

export default {
	register: ({ email, username, password }) => {
		return new Promise(async (resolve, reject) => {
			try {
				// Create a new user and obtain the data from the api
				const response = await fetch(
					`${config.apiBase}/users`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							user: { email: email, password: password, display_name: username },
						}),
					}
				);
				const authedHeader = response.headers.get('Authorization')
				// console.log("Register response", response);
				if (response && response.status != 201) {
					return reject()
				}
				// TODO: pull the token from the header...
				const user = await response.json();
				// console.log('registered user', user, authedHeader)
				resolve({ status: "success", ...user, token: authedHeader });
			} catch (e) {
				console.log("error", e);
				reject({ status: "error" });
			}
		});
	},
	signIn: ({ email, password }) => {
		return new Promise(async (resolve, reject) => {
			try {
				// Obtain the user data and token from the api
				const response = await fetch(
					`${config.apiBase}/users/sign_in`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							user: { email: email, password: password },
						}),
					}
				);
				// TODO: pull the token from the header...
				// console.log("Signin response", response);
				if (response && response.status != 201) {
					return reject()
				}

				const authedHeader = response.headers.get('Authorization')
				const user = await response.json();
				// console.log('authed user', user, authedHeader)
				resolve({ status: "success", ...user, token: authedHeader});
			} catch (e) {
				console.log("error", e);
				reject({ status: "error" });
			}
		});
	},

	getPosts: async ({ pageNumber = 0 }) => {
		return new Promise(async (resolve, reject) => {
			try {
				// Obtain the data from the api
				const response = await fetch(`${config.apiBase}/posts`);
				const posts = await response.json();
				resolve(posts);
			} catch (e) {
				console.log("error", e);
				reject({ status: "error" });
			}
		});
	},
	getPostById: async (id) => {
		return new Promise(async (resolve, reject) => {
			try {
				// Obtain the data from the api
				const response = await fetch(`${config.apiBase}/posts/${id}`);
				const post = await response.json();
				resolve(post);
			} catch (e) {
				console.log("error", e);
				reject({ status: "error" });
			}
		});
	},
	getPostByIdComments: ({ id, pageNumber = 0 }) => {
		return new Promise(async (resolve, reject) => {
			try {
				// Obtain the data from the api
				const response = await fetch(
					`${config.apiBase}/posts/${id}/comments`
				);
				const comments = await response.json();
				resolve(comments);
			} catch (e) {
				console.log("error", e);
				reject({ status: "error" });
			}
		});
	},
};
