/*
/ Rick Fox
/ 01-06-22
/ Api connector
*/

export default {
	register: ({ email, username, password }) => {},
	signIn: ({ email, password }) => {},

	getPosts: ({ pageNumber = 0 }) => {},
	getPostById: (id) => {},
	getPostByIdComments: ({ pageNumber = 0 }) => {},
};
