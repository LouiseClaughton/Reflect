import { useState, useEffect } from 'react'

function Login() {
    const clientId = "Ov23liggGB7YuMpZGh1w";
    const redirectUrl = "http://localhost:5173/callback";

    const loginUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${clientId}` +
    `&scope=repo read:org`;

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="">
                <h1>Welcome!</h1>
                <a href={loginUrl}>Login</a>
            </div>
        </div>
    )
}

export default Login;