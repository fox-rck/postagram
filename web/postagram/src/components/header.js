/*
/ Rick Fox
/ 01-06-22
/ Header Component
*/
import { useContext } from "react";
import AuthContext from "../services/auth-context";

const Header = ({ ...props }) => {
	// get the authed user from the context
	const authed = useContext(AuthContext);
	return (
		<header className="bg-blue-500 p-4">
			{"Header"}
			{!authed ? (
				"Sign In"
			) : (
				<>
					{authed} {"|"} {"Sign out"}
				</>
			)}
		</header>
	);
};

export default Header;
