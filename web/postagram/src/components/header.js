/*
/ Rick Fox
/ 01-06-22
/ Header Component
*/
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../services/auth-context";

const Header = ({ ...props }) => {
	// get the authed user from the context
	const authed = useContext(AuthContext);
	return (
		<header className="bg-blue-500 p-4 flex flex-row items-center">
			<Link to={`/`}>{"Logo"}</Link>
			<span className="flex-1" />
			{!authed ? (
				<Link to={`/signin`}>Sign In</Link>
			) : (
				<>
					{authed} {"|"} {"Sign out"}
				</>
			)}
		</header>
	);
};

export default Header;
