/*
/ Rick Fox
/ 01-06-22
/ Post Component
*/

import ArticleHeading from "./article-heading";

const Post = ({ post, isExpanded = 0 }) => {
	return (
		<article className="p-4 mx-auto max-w-screen-md bg-white rounded-2xl border-2 border-gray-200 relative overflow-hidden mb-2">
			{post ? (
				<>
					<ArticleHeading article={post} />
					<h2 className="mb-4 text-xl font-bold">{post.title}</h2>
					<p className="mb-4 text-lg">{post.body}</p>
					{!isExpanded ? (
						<>
							<hr />
							<div className="flex flex-row -mx-4 -mb-4 items-center p-2 bg-blue-100">
								<span className="flex-1" />
								<p className="text-lg ml-2 text-base font-bold text-gray-700">{`${post.comment_count} comments`}</p>
							</div>
						</>
					) : null}
				</>
			) : null}
		</article>
	);
};

export default Post;
