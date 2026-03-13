import { useState } from "react";
import Login from "./login";

function LoginHandler() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <Login onLogin={setUser} /> // ✅ pass setUser as onLogin
      ) : (
        <div>
          <h1>Welcome, {user.email}!</h1>
        </div>
      )}
    </div>
  );
}

export default LoginHandler;