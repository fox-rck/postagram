/*
/ Rick Fox
/ 01-06-22
/ Post view
*/

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext } from "react";

import config from "../config";
import utils from "../utils";
import AuthContext from "../services/auth-context";
import api from "../services/api";
import store from "../services/store";

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
	const [updated, setUpdated] = useState(false);
	const [editing, setEditing] = useState(false);
	const [error, setError] = useState(false);
	const [showDeleteConfirm, toggleDeleteConfirm] = useState(0);
	const [post, setPost] = useState(null);
	const canEdit = authed && post && authed.id == post.user.id;
	const btnStyles =
			"px-2 py-1 ml-1 rounded-lg bg-gray-200 hover:bg-gray-500 hover:text-white font-bold",
		modalClasses =
			"fixed block -inset-0 h-full w-full z-30" +
			(showDeleteConfirm ? "" : " hidden");

	useEffect(async () => {
		// call everytime we get a new post id
		let cbId;
		try {
			setError(0);
			cbId = store.addListener(() => {
				setUpdated(new Date().getTime());
			});
			setLoading(1);
			let postMod = await api.getPostById(id);
			console.log("postMod", postMod.post);

			if (postMod && postMod.post) {
				setPost(postMod.post);
			}
			setLoading(0);
		} catch (e) {
			console.log("error", e);
			setLoading(0);
			setError(1);
		}
		return () => {
			store.removeListener(cbId);
		};
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
			let updatedPost = await api.updatePostById(
				id,
				editing.title,
				editing.body
			);
			setPost({ ...updatedPost.post });
			setEditing(false);
		}
	};
	// Fn to remove the post
	const deleteFn = async () => {
		toggleDeleteConfirm(0);
		let deletedPost = await api.deletePostById(id);
		close();
	};
	let changesMade = editing ? !utils.matches(editing, post) : 0;
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
								className={config.styles.button + ""}
								to={`/`}
							>
								{"Close"}
							</Link>
							<span className="flex-1" />
							{/*{editing ? (
								<span className="flex-1 text-center text-lg font-bold text-white">
									{"Edit"}
									<small className="block text-xs">
										{"All fields are required"}
									</small>
								</span>
							) : (
								<span className="flex-1" />
							)}*/}
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
											onClick={() => {
												toggleDeleteConfirm(1);
											}}
										>
											{"Delete"}
										</button>
									</>
								)
							) : !authed ? (
								<>
									<Link
										className={
											config.styles.button.replace(
												"bg-blue-500",
												"bg-white"
											) +
											" text-blue-500 bg-white hover:bg-blue-600 hover:text-white mr-1"
										}
										to={`/signin?ret_url=/post/${post.id}`}
									>
										{"Sign In"}
									</Link>
									<Link
										className={
											config.styles.button +
											" hover:bg-blue-600 hover:text-white"
										}
										to={`/register?ret_url=/post/${post.id}`}
									>
										{"Register"}
									</Link>
								</>
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
				) : (
					<h3 className="text-center text-2xl text-gray-700 font-bold my-8 z-30 relative -translate-x-2/4 fixed top-1/4 inset-x-2/4 bg-gray-200 p-4 rounded-2xl relative w-96 -translate-x-2/4 -translate-y-2/4">
						{
							"The post you requested can not be loaded at this time."
						}
					</h3>
				)
			) : null}
			<div className={modalClasses}>
				<button
					className="bg-black h-full w-full absolute inset-0 opacity-70"
					onClick={() => {
						toggleDeleteConfirm(0);
					}}
				/>
				<div
					className={
						"confirm fixed inset-2/4 bg-gray-200 p-4 rounded-2xl relative w-96 -translate-x-2/4 -translate-y-2/4 z-30"
					}
				>
					<h3 className="text-center text-base font-bold my-8">
						{"Are you sure you want to delete this post?"}
					</h3>
					<div className="flex justify-center mb-4">
						<button
							className={
								config.styles.button.replace(
									"text-white",
									"text-gray-800"
								) + " bg-transparent mr-1"
							}
							onClick={() => {
								toggleDeleteConfirm(0);
							}}
						>
							{"Cancel"}
						</button>
						<button
							className={config.styles.button + " bg-red-500"}
							onClick={deleteFn}
						>
							{"Delete"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
