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
        <div className="w-full h-full flex justify-center items-center">
            <div className="space-y-4">
                <h1 className="text-xl font-bold">Connect your accounts</h1>

                {providers.map((provider) => {
                    const connected = loggedIn[provider.id];

                    return (
                        <div key={provider.id} className="flex items-center gap-3">
                        {connected ? (
                            <span className="text-green-500">
                            ✓ {provider.name} Connected
                            </span>
                        ) : (
                            <LiquidGlassBtn href={provider.authUrl}>
                                Login with {provider.name}
                            </LiquidGlassBtn>
                        )}
                        </div>
                    );
                })}

                {allConnected && (
                    <div className="pt-4">
                        <LiquidGlassBtn href="/dashboard">
                        Continue
                        </LiquidGlassBtn>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;