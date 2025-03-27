import React, { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(credentials);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-lg">
                <input
                    type="text"
                    placeholder="Username"
                    className="block border p-2 mb-2"
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="block border p-2 mb-2"
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;
