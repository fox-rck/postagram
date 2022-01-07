/*
/ Rick Fox
/ 01-06-22
/ Post view for showing all blogs
*/

import { Component, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../services/auth-context";
import api from "../services/api";

import PostElm from "../components/post";
import NewComment from "../components/new-comment";
import CommentList from "./partials/comments";

const Post = ({ ...props }) => {
	const authed = useContext(AuthContext),
	navigate = useNavigate();
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
	const close = ()=>{ navigate('/'); }
	const canComment = post && post.user.id;
	return (
		<div className="inner-page p-2">
			<button className="bg-black opacity-70 fixed block -inset-0 h-full w-full" onClick={close} />
			{!loadingPost ? (
				post ? (
					<>
						<PostElm post={post} isExpanded={1} />
						<section className="p-4 mx-auto max-w-screen-md bg-blue-100 rounded-2xl border-2 border-gray-200 relative overflow-hidden mb-2">
							{authed ? (
								<NewComment id={post.id} />
							) : (
								"Sign in to comment"
							)}
							<CommentList id={post.id} />
						</section>
					</>
				) : null
			) : null}
		</div>
	);
};

export default Post;
