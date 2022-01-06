/*
/ Rick Fox
/ 01-06-22
/ List Component
*/
import { useContext } from "react";
import AuthContext from "../services/auth-context";

const List = ({ pages, hasMore, isLoadingMore, loadMore, error, ...props }) => {
	// get the authed user from the context
	const authed = useContext(AuthContext);
	return (
		<section className="">
			{"List"} {pages.length}
			<br />
			{hasMore && !isLoadingMore && !error ? "Load More" : null}
			{isLoadingMore ? "Loading..." : null}
			<br />
			{error ? "Something went wrong... Try again" : null}
		</section>
	);
};

export default List;
