import { useState, useEffect } from 'react'
import LiquidGlassBtn from './Components/liquid-glass-btn';

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
                <LiquidGlassBtn href={loginUrl}>Login</LiquidGlassBtn>
            </div>
        </div>
    )
}

export default Login;