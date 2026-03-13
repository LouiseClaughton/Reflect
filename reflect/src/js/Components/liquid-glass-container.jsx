import React, { useRef, useState, useEffect } from 'react'
import '../../style.css'

// The liquid glass container component
export default function LiquidGlassContainer({ className, children, ...props }) {
    return (
        <div
            className={`relative overflow-hidden shadow-lg h-[50vh] w-[80%] self-center m-12 rounded-[60px] inline-block text-center ${className}`}
            {...props}
        >
            {/* Content layer */}
            <div
                className="absolute inset-0 flex flex-col items-center justify-center font-bold text-white"
                style={{ backgroundColor: 'hsla(0, 100%, 100%, 0.15)' }}
            >
                {children}
            </div>
        </div>
    );
}