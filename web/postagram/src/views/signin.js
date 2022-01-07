/*
/ Rick Fox
/ 01-06-22
/ Sign in view for showing all blogs
*/


import { useNavigate } from "react-router-dom";

import SigninForm from "../components/signin-form";

const Signin = () => {
	const navigate = useNavigate();
	const close = () => {
		navigate("/");
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
