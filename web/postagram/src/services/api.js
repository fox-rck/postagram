/*
/ Rick Fox
/ 01-06-22
/ Api service
*/
import api from '../connectors/api';
import store from './store';


const storeMethods = {
	addPost: async (title, body)=>{
		return new Promise(async (resolve, reject)=>{
			try {
				const newPost = await api.addPost({title, body})
				// Add it to the store
				store.setPost(newPost);
				// This will push it to the bottom of the available list
				store.setPosts([newPost.post]);
				resolve(newPost)
			} catch(e){
				console.log('error', e)
				reject()
			}
		})
	},
	updatePostById: async (id, title, body)=>{
		return new Promise(async (resolve, reject)=>{
			try {
				const updatedPost = await api.updatePostById({id, title, body})
				// Update the store
				store.setPost(updatedPost.post);
				resolve(updatedPost)
			} catch(e){
				console.log('error', e)
				reject()
			}
		})
	},
	getPosts: async (pageNumber)=>{
		return new Promise(async (resolve, reject)=>{
			try {
				const posts = await api.getPosts({pageNumber})
				// Add it to the store
				store.setPosts(posts.posts);
				resolve(posts)
			} catch(e){
				console.log('error', e)
				reject()
			}
		})
	},
	getPostById: async (id)=>{
		return new Promise(async (resolve, reject)=>{
			try {
				const post = await api.getPostById(id)
				// Update the store
				store.setPost(post.post);
				resolve(post)
			} catch(e){
				console.log('error', e)
				reject()
			}
		})
	},
	getPostByIdComments: async (id, pageNumber)=>{
		if (pageNumber == 0) {
			store.clearPostComments(id);
		}
		return new Promise(async (resolve, reject)=>{
			try {
				const comments = await api.getPostByIdComments({id, pageNumber})
				store.setPostComments(id, comments.comments);
				resolve(comments)
			} catch(e){
				console.log('error', e)
				reject()
			}
		})
	},
	addPostComment: async (id, comment)=>{
		return new Promise(async (resolve, reject)=>{
			try {
				const newComment = await api.addPostComment({id, comment})
				// Update the store
				let post = store.getPost(id).comment_count++;
				store.setPost(post);
				store.setPostComments(id, [newComment.comment]);
				resolve(newComment)
			} catch(e){
				console.log('error', e)
				reject()
			}
		})
	}
}
export default storeMethods