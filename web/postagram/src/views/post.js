/*
/ Rick Fox
/ 01-06-22
/ Post view for showing all blogs
*/

import { Component, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";

import config from "../config";
import AuthContext from "../services/auth-context";
import api from "../services/api";

import PostElm from "../components/post";
import NewComment from "../components/new-comment";
import CommentCount from "../components/comment-count";
import CommentList from "./partials/comments";

const Post = ({ ...props }) => {
	const authed = useContext(AuthContext),
		navigate = useNavigate();
	// pull the id from the url params
	const { id } = useParams();
	const [loadingPost, setLoading] = useState(1);
	const [post, setPost] = useState(null);
	const canEdit = true; //authed && post && authed.id == post.user.id;
	let btnStyles = 'px-2 py-1 ml-1 bg-gray-200 rounded-lg hover:bg-gray-500 hover:text-white font-bold'

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

	const close = () => {
		navigate("/");
	};

	return (
		<div className="inner-page">
			<button
				className="bg-black opacity-70 fixed block -inset-0 h-full w-full"
				onClick={close}
			/>
			{!loadingPost ? (
				post ? (
					<>
						<header className={config.styles.header}>
							<Link
								className={
									config.styles.button +
									" bg-white hover:bg-blue-600 hover:text-white"
								}
								to={`/`}
							>
								{"Close"}
							</Link>
							<span className="flex-1" />
							{canEdit ? (
								<>
									<button className={btnStyles}>
										{"Edit"}
									</button>
									<button
										className={
											btnStyles + " bg-red-500 text-white"
										}
									>
										{"Delete"}
									</button>
								</>
							) : null}
						</header>
						<PostElm post={post} isExpanded={1} />
						<section className="comments p-4 mx-auto max-w-screen-md bg-blue-100 rounded-b-2xl border-2 border-gray-200 relative overflow-hidden mb-2 -mt-7">
							<div className="flex flex-row mb-6 items-center">
								<span className="flex-1">
									{authed ? null : (
										<Link
											className="border border-white bg-blue-500 hover:bg-blue-600 text-white hover:text-white font-bold px-4 py-2 rounded-lg"
											to={`/signin`}
										>
											{"Sign in to comment"}
										</Link>
									)}
								</span>
								<CommentCount count={post.comment_count} />
							</div>
							{authed ? <NewComment id={post.id} /> : null}
							<CommentList id={post.id} />
						</section>
					</>
				) : null
			) : null}
		</div>
	);
};

export default Post;
