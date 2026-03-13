import { useState } from "react";
import Login from "./login";
import { Navigate } from "react-router-dom";

function LoginHandler() {
    const [user, setUser] = useState(null);

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