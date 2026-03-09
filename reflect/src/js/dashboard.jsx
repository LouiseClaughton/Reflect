import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LiquidGlassBtn from './Components/liquid-glass-btn';

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="">
                <h1>Welcome, Louise!</h1>
                <LiquidGlassBtn href='/commits'>
                    Next
                </LiquidGlassBtn>
            </div>
        </div>
    )
}

export default Dashboard;