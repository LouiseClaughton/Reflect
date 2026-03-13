import { useEffect, useMemo, useState } from "react";
import Footer from "./Footer";
import ProfileUserIcon from "../../assets/ProfileUserIcon";
import SettingsIcon from "../../assets/SettingsIcon";
import Login from "../login";
import LiquidGlassContainer from "./liquid-glass-container";

export default function Authenticated ({ children, mainClass }) {

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    return (
        <>
            <div className="h-screen">
                <nav className="border-b-1 border-white fixed top-0 w-full">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between relative">
                            <div className="flex w-40 items-center justify-start">
                                <a href="/" className="font-bold !text-white text-xl">Reflect</a>
                            </div>

                            <button 
                                onClick={() => setIsLoginOpen(prev => !prev)}
                            >
                                <SettingsIcon />
                            </button>

                            <div className={`absolute right-0 top-[5rem] ${isLoginOpen ? "" : "hidden"}`}>
                                <LiquidGlassContainer className={`${user ? "p-24" : "p-36"} !m-0 !rounded-[30px]`}>
                                    {!user ? (
                                        <Login onLogin={setUser} />
                                    ) : (
                                        <div className="flex flex-col gap-2 p-8">
                                            <span className="pb-2 border-b-1 border-white">Settings</span>
                                            <button
                                                onClick={() => {
                                                    setUser(null);
                                                    localStorage.removeItem("user");
                                                    window.location.reload();
                                                }}
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    )}
                                </LiquidGlassContainer>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className={`m-auto h-full fixed w-full top-[5rem] overflow-hidden ${mainClass}`}>{children}</main>
            </div>

            <Footer />
        </>
    );
}
