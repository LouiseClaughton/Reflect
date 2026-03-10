import { useState, useEffect, act } from "react";
import LiquidGlassBtn from "./Components/liquid-glass-btn";

function Login() {
    const redirectUrl = "http://localhost:5173/callback";
    const githubClientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const bitbucketClientId = import.meta.env.VITE_BITBUCKET_CLIENT_ID;
    const activeCollabClientId = import.meta.env.VITE_ACTIVECOLLAB_CLIENT_ID;   

    const providers = [
        {
            id: "github",
            name: "GitHub",
            authUrl: `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUrl}&scope=repo read:org&state=github`,
        },
        {
            id: "bitbucket",
            name: "Bitbucket",
            authUrl: `https://bitbucket.org/site/oauth2/authorize?client_id=${bitbucketClientId}&response_type=code&redirect_uri=${redirectUrl}&state=bitbucket`,
        },
        {
            id: "activecollab",
            name: "ActiveCollab",
            authUrl: `https://app.activecollab.com/oauth2/authorize?client_id=${activeCollabClientId}&response_type=code&redirect_uri=${redirectUrl}&state=activecollab`,
        },
    ];

    const [loggedIn, setLoggedIn] = useState({});

    useEffect(() => {
        const status = {};
        // Store logged in status in local storage
        providers.forEach((provider) => {
            if (localStorage.getItem(`${provider.id}_token`)) {
                status[provider.id] = true;
            }
        });
        setLoggedIn(status);
    }, []);

    const allConnected = providers.every((provider) => loggedIn[provider.id]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
                <h1 className="text-xl font-bold">Welcome!</h1>

                <div className="w-full max-w-[50%] flex flex-col items-center mt-6">
                    {providers.map((provider) => {
                        const connected = loggedIn[provider.id];

                        return (
                            <div key={provider.id} className="flex items-center gap-3 w-full justify-center my-3">
                                {connected ? (
                                    <LiquidGlassBtn>
                                        ✓ {provider.name} Connected
                                    </LiquidGlassBtn>
                                ) : (
                                    <LiquidGlassBtn href={provider.authUrl}>
                                        Login with {provider.name}
                                    </LiquidGlassBtn>
                                )}
                            </div>
                        );
                    })}

                    {/* {allConnected && ( */}
                        <div className="pt-4 w-full flex items-center justify-center">
                            <LiquidGlassBtn href="/dashboard" className="bg-linear-to-r from-cyan-500 to-blue-500">
                                <span className="relative z-10">Continue</span>
                            </LiquidGlassBtn>
                        </div>
                    {/* )} */}
                </div>
            </div>
    );
}

export default Login;