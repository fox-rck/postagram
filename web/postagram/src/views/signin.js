/*
/ Rick Fox
/ 01-06-22
/ Sign in view
*/

import { useNavigate } from "react-router-dom";
import utils from "../utils";
import SigninForm from "../components/signin-form";

const Signin = () => {
	const navigate = useNavigate();
	const close = () => {
		let next = utils.getParameterByName("ret_url");
		next = next ? next : "/";
		navigate(next);
	};
	return (
		<div className="inner-page">
			<button
				className="bg-black opacity-70 fixed block -inset-0 h-full w-full"
				onClick={close}
			/>
			<SigninForm close={close} />
		</div>
	);
};

export default Signin;
