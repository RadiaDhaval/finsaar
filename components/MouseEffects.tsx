"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";

type Effect = { id: string; x: number; y: number };
type InteractionMode =
    | "rings"
    | "burst"
    | "particles"
    | "crosshair"
    | "wavy"
    | "sniper";

interface Props {
    color?: string;
    interactionMode?: InteractionMode;
    duration?: number;
    strokeWidth?: number;
    effectSize?: number;
    rotation?: number;
    showLabel?: boolean;
    labelText?: string;
    labelColor?: string;
    labelFont?: CSSProperties;
}

export default function MouseEffects({
    color = "#B5723B", // Copper default for Finsaar
    interactionMode = "burst",
    duration = 0.4,
    strokeWidth = 2,
    effectSize = 60,
    rotation = 0,
    showLabel = false,
    labelText = "Click Anywhere",
    labelColor = "#ffffff",
    labelFont = { fontFamily: "Inter", fontSize: 60, fontWeight: 600 },
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [bursts, setBursts] = useState<Effect[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const container = containerRef.current;
            if (!container) return;

            const x = e.clientX;
            const y = e.clientY;
            const id = `${e.timeStamp}-${Math.round(x)}-${Math.round(y)}`;

            if (interactionMode === "burst") {
                setBursts((prev) => [...prev, { id, x, y }]);
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [interactionMode, effectSize]);

    const svgStyle = (x: number, y: number): CSSProperties => ({
        position: "absolute",
        left: x - effectSize / 2,
        top: y - effectSize / 2,
        width: effectSize,
        height: effectSize,
        pointerEvents: "none",
        overflow: "visible",
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center",
    });

    return (
        <div
            ref={containerRef}
            style={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                zIndex: 9999,
                overflow: "hidden",
            }}
        >
            {showLabel && (
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                        userSelect: "none",
                        ...labelFont,
                        color: labelColor,
                    }}
                >
                    {labelText}
                </div>
            )}

            {interactionMode === "burst" &&
                bursts.map((burst) => (
                    <svg
                        key={burst.id}
                        style={svgStyle(burst.x, burst.y)}
                        ref={(el) => {
                            if (!el) return;
                            const lines = el.querySelectorAll("line");
                            lines.forEach((line, index) => {
                                const angle =
                                    [45, 80, 115, 150][index] *
                                    (Math.PI / 180);
                                const centerX = effectSize / 2;
                                const centerY = effectSize / 2;
                                const startX =
                                    centerX + effectSize * 0.1 * Math.cos(angle);
                                const startY =
                                    centerY - effectSize * 0.1 * Math.sin(angle);
                                const endX =
                                    centerX + effectSize * 0.25 * Math.cos(angle);
                                const endY =
                                    centerY - effectSize * 0.25 * Math.sin(angle);
                                gsap.set(line, {
                                    attr: {
                                        x1: startX,
                                        y1: startY,
                                        x2: endX,
                                        y2: endY,
                                    },
                                    strokeWidth,
                                });
                                gsap.timeline()
                                    .to(line, {
                                        attr: {
                                            x1: endX,
                                            y1: endY,
                                            x2: endX,
                                            y2: endY,
                                        },
                                        translateX:
                                            (effectSize / 4) * Math.cos(angle),
                                        translateY:
                                            (-effectSize / 4) * Math.sin(angle),
                                        duration,
                                        ease: "power2.out",
                                        onComplete: () =>
                                            setBursts((prev) =>
                                                prev.filter(
                                                    (b) => b.id !== burst.id
                                                )
                                            ),
                                    })
                                    .to(
                                        line,
                                        {
                                            strokeWidth: 0,
                                            duration: duration * 0.4,
                                            ease: "linear",
                                        },
                                        duration * 0.6
                                    );
                            });
                        }}
                    >
                        {[45, 80, 115, 150].map((_, index) => {
                            const centerX = effectSize / 2;
                            const centerY = effectSize / 2;
                            return (
                                <line
                                    key={index}
                                    x1={centerX}
                                    y1={centerY}
                                    x2={centerX}
                                    y2={centerY}
                                    stroke={color}
                                    strokeWidth={strokeWidth}
                                    strokeLinecap="round"
                                />
                            );
                        })}
                    </svg>
                ))}
        </div>
    );
}
