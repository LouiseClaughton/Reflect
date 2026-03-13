import { useState } from "react";

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
                onLogin(data.user); // parent handles localStorage
                window.location.reload();
            } else {
                setMessage("Invalid email or password");
            }

        } catch (err) {
            console.error(err);
            setMessage("Error connecting to server");
        }
    };

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
            <input
                className="border-1 border-white py-2 px-4 rounded-md"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                className="border-1 border-white py-2 px-4 rounded-md"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button
                type="submit"
                className="overflow-hidden w-full rounded-[60px] text-center group flex justify-center items-center bg-linear-to-r from-cyan-500 to-blue-500"
            >
                Login
            </button>

            <a className="text-white underline text-sm mt-4">Sign Up</a>

            {message && <p>{message}</p>}
        </form>
    );
}

export default Login;