import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LiquidGlassBtn from './Components/liquid-glass-btn';
import Authenticated from './Components/authenticated-layout';

function Dashboard() {

    const today = new Date;

    return (
        <Authenticated>
            <div className="w-full h-full flex justify-center items-center">
                <div className="text-center flex items-center justify-center flex-col">
                    <h1 className="text-xl font-bold">Hello, Louise!</h1>
                    <div class="flex flex-col gap-6 my-6">
                        <span>It's been a busy {today.getFullYear()}!</span>
                        <span>Let's see what you've been up to this year...</span>
                    </div>
                    <LiquidGlassBtn href='/commits' className="bg-linear-to-r from-cyan-500 to-blue-500">
                        Next
                    </LiquidGlassBtn>
                </div>
            </div>
        </Authenticated>
    )
}

export default Dashboard;