import React, { useState } from "react";

const CameraAuth = () => {
    const [token, setToken] = useState("");

    const authenticateCamera = async () => {
        const res = await fetch("/api/camera/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        });
        const data = await res.json();
        alert(data.message);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-6 bg-white rounded shadow-lg">
                <input
                    type="text"
                    placeholder="Enter Camera Token"
                    className="block border p-2 mb-2"
                    onChange={(e) => setToken(e.target.value)}
                />
                <button onClick={authenticateCamera} className="bg-green-500 text-white px-4 py-2 rounded">Authenticate</button>
            </div>
        </div>
    );
};

export default CameraAuth;
