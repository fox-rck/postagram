/*
/ Rick Fox
/ 01-06-22
/ Sign in view for showing all blogs
*/


import { useNavigate } from "react-router-dom";

import RegisterForm from "../components/register-form";

const Register = () => {
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
			<RegisterForm close={close} />
		</div>
	);
};

export default Register;
