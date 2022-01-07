/*
/ Rick Fox
/ 01-06-22
/ Post Component
*/

import { useState, useEffect } from "react";
import ArticleHeading from "./article-heading";
import CommentCount from "./comment-count";

const Post = ({
	post,
	isExpanded = 0,
	editing = 0,
	isNew = 0,
	onChange = (type, e) => {},
}) => {
	return (
		<article
			className={
				(!isExpanded
					? "hover:bg-white bg-blue-100 "
					: "bg-white post ") +
				"px-2 py-4 md:px-4 mx-auto max-w-screen-md rounded-2xl border-2 border-gray-200 relative overflow-hidden mb-2"
			}
		>
			{post ? (
				<>
					{!isNew ? <ArticleHeading article={post} /> : null}
					{editing ? (
						<div className="grow-wrap" data-value={post.title}>
							<textarea
								onInput={(e) => {
									onChange("title", e);
								}}
								placeholder={"Untitled"}
								className="mb-3 text-xl font-bold p-2 w-full"
								rows={1}
								value={post.title}
							/>
						</div>
					) : (
						<h2 className="mb-3 text-xl font-bold p-2">
							{post.title}
						</h2>
					)}

					{editing ? (
						<div className="grow-wrap" data-value={post.body}>
							<textarea
								autoFocus={isNew}
								placeholder={"Write something..."}
								onInput={(e) => {
									onChange("body", e);
								}}
								className="mb-3 text-lg p-2 rich-text"
								rows={1}
								value={post.body}
							/>
						</div>
					) : (
						<p className="mb-3 text-lg p-2">{post.body}</p>
					)}
					{!isExpanded && !editing ? (
						<>
							<div className="flex flex-row -mx-4 -mb-4 items-center px-4 py-2 bg-blue-100">
								<span className="flex-1" />
								<CommentCount count={post.comment_count} />
							</div>
						</>
					) : null}
				</>
			) : null}
		</article>
	);
};

export default Post;
