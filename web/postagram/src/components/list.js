/*
/ Rick Fox
/ 01-06-22
/ List Component
*/
import { useContext } from "react";
import AuthContext from "../services/auth-context";

const List = ({
	type,
	pages,
	elms=[],
	hasMore,
	isLoadingMore,
	loadMore,
	error,
	Component,
	...props
}) => {
	// get the authed user from the context
	const authed = useContext(AuthContext);
	const noListings = pages[0] && pages[0][type].length == 0;
	return (
		<section className="">
			{/*{pages.map((page) => {
				return page[type].map((el) => {
					return <Component key={`type-${el.id}`} el={el} />;
				});
			})}
			*/}
			{elms.map((el) => {
				return <Component key={el.id}  el={el} />;
			})}

			<div className="mb-8" />
			{hasMore && !isLoadingMore && !error ? (
				<button
					className="text-lg font-bold mx-auto block text-white bg-blue-500 py-4 px-8 rounded-2xl"
					onClick={loadMore}
				>
					{"Load More"}
				</button>
			) : null}

			{!hasMore ? (
				<div className="text-base font-bold text-center text-gray-700">{`- No ${
					noListings ? "" : "more"
				} ${type} -`}</div>
			) : null}
			{isLoadingMore ? (
				<div className="text-base font-bold text-center text-gray-700">
					{"Loading..."}
				</div>
			) : null}
			{error ? (
				<div className="text-base font-bold text-center">
					{"Something went wrong... Try again"}
				</div>
			) : null}
			<div className="mb-8" />
		</section>
	);
};

export default List;
