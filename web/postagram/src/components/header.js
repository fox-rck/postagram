/*
/ Rick Fox
/ 01-06-22
/ Header Component
*/

import { useContext } from "react";
import { Link } from "react-router-dom";
import config from "../config";
import AuthContext from "../services/auth-context";

const Header = ({ ...props }) => {
	// get the authed user from the context
	const authed = useContext(AuthContext);
	const reload = () => {
		window.location.reload();
	};
	return (
		<header className={config.styles.header}>
			<Link to={`/`}>
				<img
					alt="Postagram"
					className="h-7 block"
					src={"/postagram.svg"}
				/>
			</Link>
			<span className="flex-1" />
			{!authed ? (
				<>
				<Link
					className={config.styles.button.replace('text-white', 'text-blue-500').replace('bg-blue-500', 'bg-white') + ' mr-1 text-blue-500'}
					to={`/signin`}
				>
					{"Sign In"}
				</Link>
				<Link
					className={config.styles.button}
					to={`/register`}
				>
					{"Register"}
				</Link>
				</>
			) : (
				<>
					<span className="font-bold text-white">
						{authed.display_name}
					</span>{" "}
					<span className="text-white px-4">{"|"}</span>
					<button className="font-bold text-white" onClick={reload}>
						{"sign out"}
					</button>
				</>
			)}
		</header>
	);
};

export default Header;
