import React, { useRef, useState, useEffect } from 'react'
import '../../style.css'

const CONTENT_BG = 'hsla(0, 100%, 100%, 0.15)';
const FILTERS = 'blur(4px) brightness(150%)';

// The liquid glass button component
export default function LiquidGlassContainer() {
    return (
        <div
            className="relative overflow-hidden shadow-lg w-full rounded-[60px] inline-block text-center"
            style={{
                maxWidth: '300px',
                minHeight: '56px',
            }}
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
                className="absolute inset-0 flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: 'hsla(0, 100%, 100%, 0.15)' }}
            >
                {children}
            </div>
        </div>
    );
}