/*
/ Rick Fox
/ 01-06-22
/ Api connector
*/

import config from "../config";

export default {
	register: ({ email, username, password }) => {},
	signIn: ({ email, password }) => {
		return new Promise(async (resolve, reject) => {
			try {
				// Obtain the data from the api
				const response = await fetch(`${config.apiBase}/users/sign_in`);
				resolve({ status: "success" });
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
				const response = await fetch(`${config.apiBase}/posts/${id}/comments`);
				const comments = await response.json();
				resolve(comments);
			} catch (e) {
				console.log("error", e);
				reject({ status: "error" });
			}
		});
	},

};
