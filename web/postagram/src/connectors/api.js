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
				const response = await fetch(`${config.apiBase}/users/sign_in`);
				resolve({ status: "success" });
			} catch (e) {
				console.log("error", e);
				resolve({ status: "error" });
			}
		});
	},

	getPosts: async ({ pageNumber = 0 }) => {
		const response = await fetch(`${config.apiBase}/posts`);
		const posts = await response.json();
		console.log("posts", posts);
		return posts;
	},
	getPostById: async (id) => {
		const response = await fetch(`${config.apiBase}/posts/${id}`);
		const post = await response.json();
		console.log("post", post);
		return post;
	},
	getPostByIdComments: ({ pageNumber = 0 }) => {},
};
