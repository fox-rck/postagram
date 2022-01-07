/*
/ Rick Fox
/ 01-06-22
/ Post Component
*/

import ArticleHeading from "./article-heading";
import CommentCount from "./comment-count";

const Post = ({ post, isExpanded = 0 }) => {
	return (
		<article className={(!isExpanded ? "hover:bg-white bg-blue-100 " : "bg-white post ") + "px-2 py-4 md:px-4 mx-auto max-w-screen-md rounded-2xl border-2 border-gray-200 relative overflow-hidden mb-2"}>
			{post ? (
				<>
					<ArticleHeading article={post}  />
					<h2 className="mb-4 text-xl font-bold">{post.title}</h2>
					<p className="mb-4 text-lg">{post.body}</p>
					{!isExpanded ? (
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
