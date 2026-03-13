import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (!code) return;

        fetch(`http://localhost:3001/oauth/callback?code=${code}`)
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('github_token', data.access_token);

                // Navigate to dashboard
                navigate('/dashboard');
            })
            .catch(console.error);
    }, [navigate]);

    return <p>Logging you in...</p>;
}

export default Callback;