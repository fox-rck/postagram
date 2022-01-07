/*
/ Rick Fox
/ 01-06-22
/ CommentCount Component
*/

const CommentCount = ({ count = 0 }) => {
	return (
		<p className="text-lg ml-2 text-base font-bold text-gray-700">{`${count} comment${
			count != 1 ? "s" : ""
		}`}</p>
	);
};

export default CommentCount;
