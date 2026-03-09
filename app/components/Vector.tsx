"use client";

import svgPaths from "../logo-file";

export default function Vector() {
    const gradientId = "vector-gradient";

    return (
        <div className="relative size-full" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 107.143 125">
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#160c28" />
                        <stop offset="100%" stopColor="#efcb68" />
                    </linearGradient>
                </defs>
                <g id="Vector">
                    <path clipRule="evenodd" d={svgPaths.p299e20} fill={`url(#${gradientId})`} fillRule="evenodd" />
                    <path d={svgPaths.pba20100} fill={`url(#${gradientId})`} />
                    <path d={svgPaths.p33251500} fill={`url(#${gradientId})`} />
                    <path d={svgPaths.p3e61c480} fill={`url(#${gradientId})`} />
                </g>
            </svg>
        </div>
    );
}