// import { useState, useEffect, act } from "react";
// import LiquidGlassBtn from "./Components/liquid-glass-btn";

// function Login() {
//     const redirectUrl = "http://localhost:5173/callback";
//     const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
//     const bitbucketClientId = import.meta.env.VITE_BITBUCKET_CLIENT_ID;
//     const activeCollabClientId = import.meta.env.VITE_ACTIVECOLLAB_CLIENT_ID;   

//     // example in React
//     useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//         const res = await fetch("http://localhost:3000/users"); // backend port
//         const data = await res.json();
//         console.log("Frontend received data:", data); // ✅ log data received
//         } catch (err) {
//         console.error("Frontend fetch error:", err);
//         }
//     };

//     fetchUsers();
//     }, []);

//     const providers = [
//         {
//             id: "github",
//             name: "GitHub",
//             authUrl: `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUrl}&scope=repo read:org&state=github`,
//         },
//         {
//             id: "bitbucket",
//             name: "Bitbucket",
//             authUrl: `https://bitbucket.org/site/oauth2/authorize?client_id=${bitbucketClientId}&response_type=code&redirect_uri=${redirectUrl}&state=bitbucket`,
//         },
//         {
//             id: "activecollab",
//             name: "ActiveCollab",
//             authUrl: `https://app.activecollab.com/oauth2/authorize?client_id=${activeCollabClientId}&response_type=code&redirect_uri=${redirectUrl}&state=activecollab`,
//         },
//     ];

//     const [loggedIn, setLoggedIn] = useState({});

//     useEffect(() => {
//         const status = {};
//         // Store logged in status in local storage
//         providers.forEach((provider) => {
//             if (localStorage.getItem(`${provider.id}_token`)) {
//                 status[provider.id] = true;
//             }
//         });
//         setLoggedIn(status);
//     }, []);

//     const allConnected = providers.every((provider) => loggedIn[provider.id]);

//     return (
//         <div className="w-full h-full flex flex-col justify-center items-center">
//                 <h1 className="text-xl font-bold">Welcome!</h1>

//                 <div className="w-full max-w-[50%] flex flex-col items-center mt-6">
//                     {providers.map((provider) => {
//                         const connected = loggedIn[provider.id];

//                         return (
//                             <div key={provider.id} className="flex items-center gap-3 w-full justify-center my-3">
//                                 {connected ? (
//                                     <LiquidGlassBtn>
//                                         ✓ {provider.name} Connected
//                                     </LiquidGlassBtn>
//                                 ) : (
//                                     <LiquidGlassBtn href={provider.authUrl}>
//                                         Login with {provider.name}
//                                     </LiquidGlassBtn>
//                                 )}
//                             </div>
//                         );
//                     })}

//                     {/* {allConnected && ( */}
//                         <div className="pt-4 w-full flex items-center justify-center">
//                             <LiquidGlassBtn href="/dashboard" className="bg-linear-to-r from-cyan-500 to-blue-500">
//                                 <span className="relative z-10">Continue</span>
//                             </LiquidGlassBtn>
//                         </div>
//                     {/* )} */}
//                 </div>
//             </div>
//     );
// }

// export default Login;

// LoginForm.jsx
import { useState } from "react";
import Authenticated from "./Components/authenticated-layout";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Login successful!");
        onLogin(data.user); // pass user to parent if needed
      } else {
        setMessage("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
  };

  return (
    <Authenticated>
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
    </Authenticated>
  );
}

export default Login;