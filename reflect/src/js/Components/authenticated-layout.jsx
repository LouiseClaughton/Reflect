import { useEffect, useMemo, useState } from "react";
import Footer from "./Footer";
import ProfileUserIcon from "../../assets/ProfileUserIcon";
import SettingsIcon from "../../assets/SettingsIcon";

export default function Authenticated ({ children }) {

    return (
        <>
            <div className="min-h-screen">
                <nav className="">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-b-1 border-white">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex w-40 items-center justify-start">
                                <a href="/" className="font-bold !text-white text-xl">Reflect</a>
                            </div>

                            <div>
                                <SettingsIcon />
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="m-12">{children}</main>
            </div>

            <Footer />
        </>
    );
}
