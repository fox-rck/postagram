/*
/ Rick Fox
/ 01-06-22
/ SignIn Form Component
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./input";
import auth from "../services/auth";

const SignInForm = ({ close, ...props }) => {
    const [email, setSignInEmail] = useState("");
    const [password, setSignInPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function emailFieldChange(e) {
        e.preventDefault();
        setSignInEmail(e.target.value);
    }

    function passwordFieldChange(e) {
        e.preventDefault();
        setSignInPassword(e.target.value);
    }

    async function handleSignIn(e) {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        try {
            await auth.signIn(email, password);
            setLoading(false);
            close();
        } catch (err) {
            // Remediation logic
            setErrorMessage("There was an error signing in");
            setLoading(false);
        }
    }

    return (
        <div className="items-center justify-center p-4 relative mx-auto top-4 max-w-sm rounded-2xl z-30 bg-white">
            <h2 className="text-4xl text-left mb-8 mt-4 font-bold">
                {"Sign In"}
            </h2>

            <Input
                label={"Email"}
                placeholder=""
                value={email}
                onChange={(e) => emailFieldChange(e)}
            />
            <div className="mb-2" />
            <Input
                type="password"
                label={"Password"}
                placeholder=""
                value={password}
                onChange={(e) => passwordFieldChange(e)}
            />
            <p className="text-red-900">{errorMessage}</p>
            <div className="flex flex-row mb-6 items-center">
                <span className="flex-1">
                    {"Don't have an account?"}
                    <div>
                        <Link
                            className="text-blue-500 font-bold underline"
                            to={"/register"}
                        >
                            {"Register"}
                        </Link>
                    </div>
                </span>
                <button
                    className={`
                mt-6 border rounded-xl border-gray-300 p-2 bg-blue-500 text-white hover:bg-gray-500 hover:text-white
                ${loading ? "bg-green-500 text-white animate-pulse" : ""}
              `}
                    disabled={loading}
                    onClick={handleSignIn}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default SignInForm;
