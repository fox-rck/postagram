/*
/ Rick Fox
/ 01-06-22
/ Post view for showing all blogs
*/

import { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import PostElm from "../components/post";

const Post = ({ ...props }) => {
	// pull the id from the url params
	const { id } = useParams();
	const [loadingPost, setLoading] = useState(1);
	const [post, setPost] = useState(null);

	useEffect(async () => {
		// call everytime we get a new post id
		try {
			setLoading(1);
			let postMod = await api.getPostById(id);
			// console.log("postMod", postMod.post);
			if (postMod && postMod.post) {
				setPost(postMod.post);
				setLoading(0);
			}
		} catch (e) {
			console.log("error", e);
		}
	}, [id]);

	return (
		<div className="inner-page bg-white">
			{!loadingPost ? (
				post ? <PostElm post={post} /> : null
			) : null}
		</div>
	);
};

export default Post;
