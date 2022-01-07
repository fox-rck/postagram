/*
/ Rick Fox
/ 01-06-22
/ Model Store
*/

import utils from "../utils";

let store = {
	listeners: {},
	allPosts: [],
	posts: {},
	setPosts: (posts) => {
		posts.forEach((post) => {
			store.posts[post.id] = post;
		});
		store.allPosts = [...store.allPosts, ...posts];
		// sort the posts newest to oldest
		const k = "id";
		store.allPosts.sort((a, b) => b[k] - a[k]);

		store.emit();
	},
	setPost: (post) => {
		store.posts[post.id] = post;
		store.emit();
	},
	setPostComments: (id, comments) => {
		let existing = store.posts[id].comments ? store.posts[id].comments : [];
		store.posts[id].comments = [...existing, ...comments];
		store.emit();
	},
	clearPostComments: (id) => {
		store.posts[id].comments = [];
		store.emit();
	},
	getPost: (id) => {
		return store.posts[id];
	},
	emit: () => {
		Object.keys(store.listeners).forEach((k) => {
			if (store.listeners[k]) {
				store.listeners[k]();
			}
		});
	},
	addListener: (cb) => {
		let newId = utils.getRandom();
		store.listeners[newId] = cb;
		return cb;
	},
	removeListener: (id) => {
		delete store.listeners[id];
	},
};
window.store = store;
export default store;
