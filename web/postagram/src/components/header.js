/*
/ Rick Fox
/ 01-06-22
/ Header Component
*/
import { useContext } from "react";
import { Link } from "react-router-dom";
import config from	"../config";
import AuthContext from "../services/auth-context";

const Header = ({ ...props }) => {
	// get the authed user from the context
	const authed = useContext(AuthContext);
	return (
		<header 
		className={config.styles.header}
		//className="bg-blue-500 p-4 flex flex-row items-center"
		>
			<Link to={`/`}>
				<img alt='Postagram' className='h-7 block' src={'/postagram.svg'} />
			</Link>
			<span className="flex-1" />
			{!authed ? (
				<Link className='border border-white bg-white hover:bg-blue-600 text-blue-500 hover:text-white font-bold px-4 py-1 rounded-lg' to={`/signin`}>Sign In</Link>
			) : (
				<>
					{authed} {"|"} {"Sign out"}
				</>
			)}
		</header>
	);
};

export default Header;
