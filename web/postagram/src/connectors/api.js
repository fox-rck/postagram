/*
/ Rick Fox
/ 01-06-22
/ Api connector
*/

import config from "../config";
import auth from "../services/auth";

export default {
	register: ({ email, username, password }) => {
		return new Promise(async (resolve, reject) => {
			try {
				// Create a new user and obtain the data from the api
				const response = await fetch(`${config.apiBase}/users`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						user: {
							email: email,
							password: password,
							display_name: username,
						},
					}),
				});

				// verify response status
				if (response && response.status != 201) {
					return reject();
				}

				// pull the Auth token from the headers
				const authedHeader = response.headers.get("Authorization");

				const user = await response.json();

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
				// verify response status
				if (response && response.status != 201) {
					return reject();
				}
				// pull the Auth token from the headers
				const authedHeader = response.headers.get("Authorization");

				const user = await response.json();

				resolve({ status: "success", ...user, token: authedHeader });
			} catch (e) {
				console.log("error", e);
				reject({ status: "error" });
			}
		});
	},
	addPost: async ({ title, body }) => {
		return new Promise(async (resolve, reject) => {
			try {
				// Send the data to the api
				const response = await fetch(`${config.apiBase}/posts`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: auth.authedUser.token,
					},
					body: JSON.stringify({
						post: {
							title: title,
							body: body,
						},
					}),
				});

				const newPost = await response.json();

				resolve(newPost);
			} catch (e) {
				console.log("error", e);
				reject({ status: "error" });
			}
		});
	},
	updatePostById: async ({ id, title, body }) => {
		return new Promise(async (resolve, reject) => {
			try {
				// Send the data to the api
				const response = await fetch(`${config.apiBase}/posts/${id}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: auth.authedUser.token,
					},
					body: JSON.stringify({
						post: {
							title: title,
							body: body,
						},
					}),
				});

				const newPost = await response.json();

				resolve(newPost);
			} catch (e) {
				console.log("error", e);
				reject({ status: "error" });
			}
		});
	},
	deletePostById: async (id) => {
		return new Promise(async (resolve, reject) => {
			try {
				// Send the data to the api
				const response = await fetch(`${config.apiBase}/posts/${id}`, {
					method: "DELETE",
					headers: {
						Authorization: auth.authedUser.token,
					},
				});
				// verify response status
				if (response && response.status != 204) {
					return reject();
				}

				resolve();
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
				const response = await fetch(
					`${config.apiBase}/posts?page=${pageNumber}`
				);
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
				// ensure we got a post
				if (!post.post) {
					return reject();
				}
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
					`${config.apiBase}/posts/${id}/comments?page=${pageNumber}`
				);
				const comments = await response.json();
				resolve(comments);
			} catch (e) {
				console.log("error", e);
				reject({ status: "error" });
			}
		});
	},
	addPostComment: async ({ id, comment }) => {
		return new Promise(async (resolve, reject) => {
			try {
				// Send the data to the api
				const response = await fetch(`${config.apiBase}/comments`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: auth.authedUser.token,
					},
					body: JSON.stringify({
						comment: {
							post_id: id,
							content: comment,
						},
					}),
				});
				const newComment = await response.json();
				resolve(newComment);
			} catch (e) {
				console.log("error", e);
				reject({ status: "error" });
			}
		});
	},
};
