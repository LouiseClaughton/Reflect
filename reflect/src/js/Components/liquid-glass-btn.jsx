import React, { useRef, useState, useEffect } from 'react'
import '../../style.css'

// The liquid glass button component
export default function LiquidGlassBtn({ children, href, className, gradient_from, gradient_to, ...props }) {
    return (
        <a
            href={href}
            className={`relative overflow-hidden shadow-lg w-full rounded-[60px] text-center group flex justify-center items-center ${className}`}
            style={{
                maxWidth: '300px',
                minHeight: '56px',
                backgroundColor: "hsla(0, 100%, 100%, 0.15)"
            }}
            {...props}
        >
            {/* Gradient layer */}
            <div className={`absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${gradient_from} ${gradient_to}`}></div>

            {/* Content */}
            <div
                className="relative flex items-center justify-center font-bold text-white h-full px-6"
            >
                {children}
            </div>
        </a>
    )
}