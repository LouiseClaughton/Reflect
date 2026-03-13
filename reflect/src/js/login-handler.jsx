import { useState, useEffect } from "react";
import Login from "./login";
import { Navigate } from "react-router-dom";

function LoginHandler() {
    // Initialize from localStorage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    return (
        <div>
            {!user ? (
                <Login onLogin={setUser} />
            ) : (
                <Navigate to="/dashboard" replace />
            )}
        </div>
    );
}

export default LoginHandler;