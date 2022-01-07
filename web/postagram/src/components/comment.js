/*
/ Rick Fox
/ 01-06-22
/ Comment Component
*/

import ArticleHeading from './article-heading';

const Comment = ({comment}) =>{
	return (
		<article className="comment p-4 mx-auto max-w-screen-md bg-white rounded-2xl border-2 border-gray-200 relative overflow-hidden mb-2">
			<ArticleHeading article={comment} />
			{comment.content}
		</article>
	)
}

export default Comment;