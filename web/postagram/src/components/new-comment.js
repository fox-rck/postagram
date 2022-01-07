/*
/ Rick Fox
/ 01-06-22
/ New Comment Component
*/

import { useState } from "react";
import config from "../config";
import api from "../services/api";

const NewComment = ({ id }) => {
	const [comment, setComment] = useState("");
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const submit = async () => {
		setErrorMessage("");
		setLoading(true);
		try {
			let newComment = await api.addPostComment(id, comment);
			setComment("");
			setLoading(false);
		} catch (e) {
			console.log("error", e);
			setErrorMessage("There was an error submitting your comment");
		}
	};
	return (
		<>
			<div className="flex items-start">
				<div className="grow-wrap flex-1" data-value={comment}>
					<textarea
						onInput={(e) => {
							setComment(e.target.value);
						}}
						placeholder={"Leave a comment..."}
						className="mb-3 text-base p-2 w-full "
						rows={1}
						value={comment}
					/>
				</div>
				<button
					className={
						config.styles.button +
						(comment <= ""
							? " bg-gray-300 text-gray-400"
							: " bg-blue-500 text-white") +
						" ml-1" +
						(loading
							? " bg-green-500 text-white animate-pulse"
							: "")
					}
					disabled={comment <= "" || loading}
					onClick={submit}
				>
					{loading ? "Submitting..." : "Submit"}
				</button>
			</div>
			<p className="text-red-900">{errorMessage}</p>
		</>
	);
};

export default NewComment;
