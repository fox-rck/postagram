/*
/ Rick Fox
/ 01-06-22
/ Api service
*/
import api from '../connectors/api';

let store = {

}

const storeMethods = {
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
	}
}
export default storeMethods