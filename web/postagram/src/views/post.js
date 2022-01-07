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

// TODO: this should go in a util file
const matches = (obj, source) =>
	Object.keys(source).every(
		(key) => obj.hasOwnProperty(key) && obj[key] === source[key]
	);

const Post = ({ ...props }) => {
	const authed = useContext(AuthContext),
		navigate = useNavigate();
	// pull the id from the url params
	const { id } = useParams();

	const [loadingPost, setLoading] = useState(1);
	const [editing, setEditing] = useState(false);
	const [post, setPost] = useState(null);
	const canEdit = authed && post && authed.id == post.user.id;
	let btnStyles =
		"px-2 py-1 ml-1 rounded-lg bg-gray-200 hover:bg-gray-500 hover:text-white font-bold";

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
	// toggle the edit functionality
	const toggleEdit = () => {
		if (editing) {
			return setEditing(false);
		}
		setEditing({ ...post });
	};
	// Fn to save the changes
	const save = async () => {
		if (editing) {
			console.log("save", editing);
			let updatedPost = await api.updatePostById(id, editing.title, editing.body)
			setPost({...editing})
			setEditing(false);
		}
	};

	let changesMade = editing ? !matches(editing, post) : 0;
	changesMade =
		changesMade && editing.title > "" && editing.body > "" ? 1 : 0;

	const fieldChanged = (type, e) => {
		console.log("on Change", type, e.target.value);
		setEditing((s) => {
			s[type] = e.target.value;
			return { ...s };
		});
	};

	return (
		<div className="inner-page">
			<button
				className={
					"bg-black opacity-70 fixed block -inset-0 h-full w-full" +
					(editing ? " opacity-90" : "")
				}
				onClick={close}
			/>
			{!loadingPost ? (
				post ? (
					<>
						<header className={config.styles.header + " mb-4"}>
							<Link
								className={
									config.styles.button +
									""
								}
								to={`/`}
							>
								{"Close"}
							</Link>
							{editing ? (
								<span className="flex-1 text-center text-lg font-bold text-white">
									{"Edit Post"}
									<small className="block">
										{"All fields are required"}
									</small>
								</span>
							) : (
								<span className="flex-1" />
							)}
							{canEdit ? (
								editing ? (
									<>
										<button
											className={
												btnStyles.replace(
													"bg-gray-200",
													"bg-green-500"
												) +
												(!changesMade
													? " invisible"
													: "")
											}
											onClick={save}
										>
											{"Save"}
										</button>
										<button
											onClick={toggleEdit}
											className={btnStyles.replace(
												"bg-gray-200",
												"bg-gray-400"
											)}
										>
											{"Cancel"}
										</button>
									</>
								) : (
									<>
										<button
											className={btnStyles}
											onClick={toggleEdit}
										>
											{"Edit"}
										</button>
										<button
											className={
												btnStyles +
												" bg-red-500 text-white"
											}
										>
											{"Delete"}
										</button>
									</>
								)
							) : !authed ? (
								<Link
									className={
										config.styles.button +
										" bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
									}
									to={`/signin?ret_url=/post/${post.id}`}
								>
									{"Sign In"}
								</Link>
							) : null}
						</header>
						<PostElm
							post={editing ? editing : post}
							isExpanded={1}
							editing={editing}
							onChange={fieldChanged}
						/>
						{!editing ? (
							<section className="comments p-4 mx-auto max-w-screen-md bg-blue-100 rounded-b-2xl border-2 border-gray-200 relative overflow-hidden mb-2 -mt-7">
								<div className="flex flex-row mb-6 items-center">
									<span className="flex-1">
										{!authed ? (
											<Link
												className={
													config.styles.button +
													" py-2"
												}
												to={`/signin?ret_url=/post/${post.id}`}
											>
												{"Sign In to comment"}
											</Link>
										) : null}
									</span>
									<CommentCount count={post.comment_count} />
								</div>
								{authed ? <NewComment id={post.id} /> : null}
								<CommentList id={post.id} />
							</section>
						) : null}
					</>
				) : null
			) : null}
		</div>
	);
};

export default Post;
