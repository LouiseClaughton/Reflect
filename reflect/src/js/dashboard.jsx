import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LiquidGlassBtn from './Components/liquid-glass-btn';
import Authenticated from './Components/authenticated-layout';
import Login from './login';

function Dashboard() {
    const today = new Date;
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    return (
        <Authenticated mainClass="!top-0">
            <div className="w-full h-full flex justify-center items-center">
                <div className="text-center flex items-center justify-center flex-col">
                    {!user ? (
                        <>
                            <h1 className="text-xl font-bold">Hello!</h1>
                            <div class="flex flex-col gap-6 my-6">
                                <span>Please log in or create an account to use Reflect.</span>
                                <Login onLogin={setUser} />
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-xl font-bold">Hello, Louise!</h1>
                            <div class="flex flex-col gap-6 my-6">
                                <span>It's been a busy {today.getFullYear()}!</span>
                                <span>Let's see what you've been up to this year...</span>
                            </div>
                            <LiquidGlassBtn href='/commits' className="bg-linear-to-r from-cyan-500 to-blue-500">
                                Next
                            </LiquidGlassBtn>
                        </>
                    )}
                </div>
            </div>
        </Authenticated>
    )
}

export default Dashboard;