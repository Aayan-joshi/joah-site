"use client";

import svgPaths from "../logo-file";

interface LogoProps {
    size?: number;
    className?: string;
}

export function Logo({ size = 50, className = "" }: LogoProps) {
    const gradientId = "logo-gradient";
    const glowId = "logo-glow";

    return (
        <div
            className={`inline-block transition-transform duration-300 hover:scale-110 ${className}`}
            style={{ width: size, height: size }}
        >
            <svg
                className="block size-full drop-shadow-[0_0_6px_rgba(239,203,104,0.4)]"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 107.143 125"
                aria-label="Logo"
            >
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#efcb68" />
                        <stop offset="100%" stopColor="#efcb68" />
                    </linearGradient>
                    <filter id={glowId}>
                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <g filter={`url(#${glowId})`}>
                    <path
                        clipRule="evenodd"
                        d={svgPaths.p299e20}
                        fill={`url(#${gradientId})`}
                        fillRule="evenodd"
                    />
                    <path d={svgPaths.p33251500} fill={`url(#${gradientId})`} />
                    <path d={svgPaths.p3e61c480} fill={`url(#${gradientId})`} />
                    <path d={svgPaths.pba20100} fill={`url(#${gradientId})`} />
                </g>
            </svg>
        </div>
    );
}