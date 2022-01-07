/*
/ Rick Fox
/ 01-06-22
/ Api service
*/
import api from '../connectors/api';

let store = {

}

const storeMethods = {
	addPost: async (title, body)=>{
		return new Promise(async (resolve, reject)=>{
			try {
				const newPost = await api.addPost({title, body})
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
				resolve(post)
			} catch(e){
				console.log('error', e)
				reject()
			}
		})
	},
	getPostByIdComments: async (id, pageNumber)=>{
		return new Promise(async (resolve, reject)=>{
			try {
				const post = await api.getPostByIdComments({id, pageNumber})
				resolve(post)
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
				resolve(newComment)
			} catch(e){
				console.log('error', e)
				reject()
			}
		})
	}
}
export default storeMethods