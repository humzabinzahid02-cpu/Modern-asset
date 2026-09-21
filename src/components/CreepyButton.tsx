import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CreepyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    /**
     * Optional custom class for the button container
     */
    className?: string;
    /**
     * Optional custom class for the button cover (the visible part)
     */
    coverClassName?: string;
}

type Coords = {
    x: number;
    y: number;
};

export const CreepyButton = ({
    children,
    className,
    coverClassName,
    onClick,
    ...props
}: CreepyButtonProps) => {
    const eyesRef = useRef<HTMLSpanElement>(null);
    const [eyeCoords, setEyeCoords] = useState<Coords>({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const updateEyes = (e: React.MouseEvent | React.TouchEvent) => {
        const userEvent =
            "touches" in e ? (e as React.TouchEvent).touches[0] : (e as React.MouseEvent);

        if (!eyesRef.current) return;

        // get the center of the eyes container
        const eyesRect = eyesRef.current.getBoundingClientRect();
        const eyesCenter = {
            x: eyesRect.left + eyesRect.width / 2,
            y: eyesRect.top + eyesRect.height / 2,
        };

        // cursor position
        const cursor = {
            x: userEvent.clientX,
            y: userEvent.clientY,
        };

        // calculate the eye angle
        const dx = cursor.x - eyesCenter.x;
        const dy = cursor.y - eyesCenter.y;
        const angle = Math.atan2(-dy, dx) + Math.PI / 2;

        // pupil distance from the eye center
        const visionRangeX = 180; // Max distance to look horizontally
        const visionRangeY = 75; // Max distance to look vertically
        const distance = Math.hypot(dx, dy);

        // Limit the movement so pupils don't go too far
        const x = (Math.sin(angle) * Math.min(distance, visionRangeX)) / visionRangeX;
        const y = (Math.cos(angle) * Math.min(distance, visionRangeY)) / visionRangeY;

        setEyeCoords({ x, y });
    };

    // Reset eyes when mouse leaves
    const resetEyes = () => {
        setEyeCoords({ x: 0, y: 0 });
        setIsHovered(false);
    };

    const pupilStyle: React.CSSProperties = {
        transform: `translate(calc(-50% + ${eyeCoords.x * 50}%), calc(-50% + ${eyeCoords.y * 50}%))`,
    };

    return (
        <button
            className={cn(
                "relative min-w-[9.5em] rounded-xl bg-[#0C141D] cursor-pointer outline-none select-none group tap-highlight-transparent shadow-[0_4px_16px_rgba(0,0,0,0.2)]",
                "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E07B10]",
                className
            )}
            onClick={onClick}
            onMouseMove={(e) => {
                updateEyes(e);
                setIsHovered(true);
            }}
            onTouchMove={updateEyes}
            onMouseLeave={resetEyes}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            {...props}
        >
            {/* Eyes Container */}
            <span
                ref={eyesRef}
                className="absolute flex items-center gap-[0.375em] right-[0.9em] bottom-[0.55em] h-[0.75em] z-0 pointer-events-none"
            >
                {/* Left Eye */}
                <span
                    className="relative w-[0.75em] h-[0.75em] bg-white rounded-full overflow-hidden block"
                    style={{
                        animation: "creepyEyeBlink 3.2s ease-in-out infinite",
                    }}
                >
                    <span
                        className="absolute top-1/2 left-1/2 w-[0.375em] h-[0.375em] bg-black rounded-full transition-transform duration-75 ease-out"
                        style={pupilStyle}
                    />
                </span>
                {/* Right Eye */}
                <span
                    className="relative w-[0.75em] h-[0.75em] bg-white rounded-full overflow-hidden block"
                    style={{
                        animation: "creepyEyeBlink 3.2s ease-in-out infinite",
                    }}
                >
                    <span
                        className="absolute top-1/2 left-1/2 w-[0.375em] h-[0.375em] bg-black rounded-full transition-transform duration-75 ease-out"
                        style={pupilStyle}
                    />
                </span>
            </span>

            {/* Button Cover */}
            <span
                className={cn(
                    "absolute inset-0 rounded-xl bg-gradient-to-r from-[#E07B10] to-[#C46C0C] text-white font-display font-bold uppercase tracking-wider text-xs sm:text-sm",
                    "shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_10px_rgba(224,123,16,0.35)]",
                    "flex items-center justify-center px-4 py-2",
                    "origin-[1.25em_50%]",
                    coverClassName
                )}
                style={{
                    transform: isHovered ? "rotate(-12deg)" : "rotate(0deg)",
                    transition: "transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
            >
                {children}
            </span>

            {/* Invisible placeholder to maintain size since cover is absolute */}
            <span className="block opacity-0 px-4 py-2 font-display font-bold uppercase tracking-wider text-xs sm:text-sm min-w-[9.5em] pointer-events-none">
                {children}
            </span>

            <style>{`
                @keyframes creepyEyeBlink {
                    0%, 90%, 100% {
                        transform: scaleY(1);
                    }
                    95% {
                        transform: scaleY(0.08);
                    }
                }
            `}</style>
        </button>
    );
};

export default CreepyButton;
