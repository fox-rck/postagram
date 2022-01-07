/*
/ Rick Fox
/ 01-06-22
/ Register Form Component
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./input";
import auth from "../services/auth";

const RegisterForm = ({ close, ...props }) => {
    const [model, setModel] = useState({
        email: "",
        password: "",
        re_password: "",
        username: "",
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function fieldChange(type, e) {
        e.preventDefault();

        setModel((s) => {
            s[type] = e.target.value;
            return { ...s };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);
        if (model.password != model.re_password) {
            return setErrorMessage("Passwords must match");
        }
        try {
            await auth.register(model.username, model.email, model.password);
            setLoading(false);
            close();
        } catch (err) {
            // Remediation logic
            setErrorMessage("There was an error registering");
            setLoading(false);
        }
    }

    return (
        <div className="items-center justify-center p-4 relative mx-auto top-4 max-w-sm rounded-2xl z-30 bg-white">
            <h2 className="text-4xl text-left mb-8 mt-4 font-bold">
                {"Register"}
            </h2>
            <Input
                label={"Username"}
                placeholder=""
                value={model.username}
                onChange={(e) => fieldChange("username", e)}
            />
            <div className="mb-2" />
            <Input
                label={"Email"}
                placeholder=""
                value={model.email}
                onChange={(e) => fieldChange("email", e)}
            />
            <div className="mb-2" />
            <Input
                type="password"
                label={"Password"}
                placeholder=""
                value={model.password}
                onChange={(e) => fieldChange("password", e)}
            />
            <div className="mb-2" />
            {model.password ? (
                <Input
                    type="password"
                    label={"Re-type Password"}
                    placeholder=""
                    value={model.re_password}
                    onChange={(e) => fieldChange("re_password", e)}
                />
            ) : null}
            <p className="text-red-900">{errorMessage}</p>
            <div className="flex flex-row mb-6 items-center">
                <span className="flex-1">
                    {"Already have an account?"}
                    <div>
                        <Link
                            className="text-blue-500 font-bold underline"
                            to={"/signin"}
                        >
                            {"Sign In"}
                        </Link>
                    </div>
                </span>
                <button
                    className={`
                mt-6 border rounded-xl border-gray-300 p-2 bg-blue-500 text-white hover:bg-gray-500 hover:text-white
                ${loading ? "bg-green-500 text-white animate-pulse" : ""}
              `}
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default RegisterForm;
