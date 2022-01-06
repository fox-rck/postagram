/*
/ Rick Fox
/ 01-06-22
/ Post Component
*/
// import { useContext } from "react";
// import AuthContext from "../services/auth-context";

const Post = ({ post }) => {
	// const authed = useContext(AuthContext);
	return (
		<article className="p-4 mx-auto max-w-screen-md bg-white rounded-2xl border-2 border-gray-200 relative">
			{post ? (
				<>
					<div className="flex flex-row mb-6 items-center">
						<img
							className="inline object-cover w-12 h-12 mr-2 rounded-full border-2 border-gray-500"
							src="https://images.pexels.com/photos/799880/pexels-photo-799880.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
							alt="Profile image"
						/>
						<p className="text-lg ml-2 font-semibold">
							{post.user.display_name}
							<span className="block text-sm font-normal">
								{post.created_at == post.updated_at
									? `created ${post.created_at}`
									: `updated ${post.updated_at}`}
							</span>
						</p>
					</div>
					<h2 className="mb-4 text-xl font-bold">{post.title}</h2>
					<p className="mb-4 text-lg">{post.body}</p>
					<hr />
					<div className="flex flex-row mb-4 items-center p-2 bg-gray-200">
						<span className="flex-1" />
						<p className="text-lg ml-2 font-small">{`${post.comment_count} comments`}</p>
					</div>
				</>
			) : null}
		</article>
	);
};

export default Post;
