/*
/ Rick Fox
/ 01-06-22
/ Post view for showing all blogs
*/


import { Component } from 'react'
import { useParams } from "react-router-dom";

const Post = ({...props}) => {

	const {id} = useParams()
	return (<>
		{'Post'}{id}
		</>
	)
}

export default Post;