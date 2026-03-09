import React, { useRef, useState, useEffect } from 'react'
import '../../style.css'

// The liquid glass container component
export default function LiquidGlassContainer({ className, children, ...props }) {
    return (
        <div
            className={`relative overflow-hidden shadow-lg w-full rounded-[60px] inline-block text-center h-full ${className}`}
        {...props}
        >
        {/* Filter layer */}
        <div
            className="absolute inset-0"
            style={{
            backdropFilter: 'blur(4px) brightness(150%)',
            WebkitBackdropFilter: 'blur(4px) brightness(150%)',
            }}
        />
        {/* Content layer */}
        <div
            className="absolute inset-0 flex flex-col items-center justify-center font-bold text-white"
            style={{ backgroundColor: 'hsla(0, 100%, 100%, 0.15)' }}
        >
            {children} {/* now this will render correctly */}
        </div>
        </div>
    );
}