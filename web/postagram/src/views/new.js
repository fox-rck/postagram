/*
/ Rick Fox
/ 01-06-22
/ New view
*/

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";

import config from "../config";
import AuthContext from "../services/auth-context";
import api from "../services/api";

import PostElm from "../components/post";

const defaultPost = {
	title: "",
	body: "",
};
const NewPost = ({ ...props }) => {
	const authed = useContext(AuthContext),
		navigate = useNavigate();
	// pull the id from the url params
	const [loading, setLoading] = useState(false);
	const [editing, setEditing] = useState({ ...defaultPost });
	let btnStyles =
		"px-2 py-1 ml-1 rounded-lg bg-gray-200 hover:bg-gray-500 hover:text-white font-bold";

	const close = () => {
		navigate("/");
	};

	// Fn to save the changes
	const save = async () => {
		if (editing) {
			setLoading(1);
			let newPost = await api.addPost(editing.title, editing.body);
			setEditing({ ...defaultPost });
			setLoading(0);
			close();
		}
	};
	const changesMade = editing.title > "" && editing.body > "";

	const fieldChanged = (type, e) => {
		setEditing((s) => {
			s[type] = e.target.value;
			return { ...s };
		});
	};

	return (
		<div className="inner-page">
			<button
				className={
					"bg-black opacity-70 fixed block -inset-0 h-full w-full opacity-90"
				}
				onClick={close}
			/>
			<>
				<header className={config.styles.header + " mb-4"}>
					<Link
						className={
							config.styles.button
								.replace("text-white", "text-blue-500")
								.replace("bg-blue-500", "bg-white") +
							" hover:bg-blue-600 hover:text-white"
						}
						to={`/`}
					>
						{"Close"}
					</Link>
					<span className="flex-1 text-center text-lg font-bold text-white">
						{"New Post"}
						<small className="block text-xs">
							{"All fields are required"}
						</small>
					</span>
					<button
						className={
							btnStyles.replace("bg-gray-200", "bg-green-500") +
							(!changesMade ? " invisible" : "") +
							(loading ? " bg-green-500 animate-pulse" : "") +
							" text-white"
						}
						onClick={save}
					>
						{loading ? "Posting..." : "Post"}
					</button>
				</header>
				<PostElm
					isNew={1}
					post={editing}
					isExpanded={1}
					editing={editing}
					onChange={fieldChanged}
				/>
			</>
		</div>
	);
};

export default NewPost;
