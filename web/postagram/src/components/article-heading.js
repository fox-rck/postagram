/*
/ Rick Fox
/ 01-06-22
/ Article Heading Component
*/

import { useEffect, useState } from "react";
import { format } from "date-fns";
import config from "../config";

const ArticleHeader = ({ article }) => {
	const [dateOut, setDateOut] = useState();
	const formatDate = (created_at, updated_at) => {
		if (!created_at || !updated_at) {
			return "Invalid date";
		}
		let dOut = `created ${created_at.replace("T", " ").replace("Z", "")}`;
		try {
			if (created_at == updated_at) {
				// try to cast the date string into a date object for formating
				dOut = `created ${format(
					Date.parse(created_at.replace("T", " ")),
					config.dateFormat
				)}`;
			} else {
				// try to cast the date string into a date object for formating
				dOut = `updated ${format(
					Date.parse(updated_at.replace("T", " ")),
					config.dateFormat
				)}`;
			}
		} catch (e) {
			console.log("date-error", e);
		}
		return dOut;
	};
	// set the default date output
	useEffect(() => {
		setDateOut(formatDate(article.created_at, article.updated_at));
	}, [article]);
	return article && article.user ? (
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
	) : null;
};

export default ArticleHeader;
