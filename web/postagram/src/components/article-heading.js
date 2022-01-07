/*
/ Rick Fox
/ 01-06-22
/ Article Heading Component
*/

import { format } from "date-fns";
import config from "../config";

const ArticleHeader = ({ article }) => {
	const formatDate = (created_at, updated_at) => {
		let dateOut = `created ${created_at
			.replace("T", " ")
			.replace("Z", "")}`;
		try {
			if (created_at == updated_at) {
				// try to cast the date string into a date object for formating
				dateOut = `created ${format(
					Date.parse(created_at.replace("T", " ")),
					config.dateFormat
				)}`;
			} else {
				// try to cast the date string into a date object for formating
				dateOut = `updated ${format(
					Date.parse(updated_at.replace("T", " ")),
					config.dateFormat
				)}`;
			}
		} catch (e) {
			console.log("date-error", e);
		}
		return dateOut;
	};
	// set the default date output
	let dateOut = formatDate(article.created_at, article.updated_at);
	return (
		<div className="flex flex-row mb-6 items-center">
			<img
				className="inline object-cover w-12 h-12 mr-2 rounded-full border-2 border-gray-500"
				src="https://images.pexels.com/photos/799880/pexels-photo-799880.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
				alt="Profile image"
			/>
			<p className="text-lg ml-2 font-semibold flex-1">
				{article.user.display_name}
				<span className="block text-xs font-normal">{dateOut}</span>
			</p>
		</div>
	);
};

export default ArticleHeader;
