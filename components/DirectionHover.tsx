"use client"

import { useRef, useState } from "react"

const EASE_MAP: Record<string, string> = {
    linear: "linear",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
}

function transitionToCss(t: Record<string, any> | undefined): string {
    const duration = (t && t.duration) || 0.4
    let ease = "cubic-bezier(0.22, 1, 0.36, 1)"
    if (t && t.ease) {
        if (Array.isArray(t.ease)) ease = `cubic-bezier(${t.ease.join(", ")})`
        else if (EASE_MAP[t.ease]) ease = EASE_MAP[t.ease]
    } else if (t && t.type === "spring") {
        ease = "cubic-bezier(0.34, 1.56, 0.64, 1)"
    }
    return `transform ${duration}s ${ease}`
}

function OriginkitBase_DirectionHover(props: Record<string, any>) {
    props = { ...COMPONENT_DEFAULTS, ...props }
    const { title, font, gap, textColor, hoverColor, transition, style } = props

    const ref = useRef<HTMLSpanElement>(null)
    const [dir, setDir] = useState<"none" | "top" | "bottom">("none")

    const onEnter = (e: React.MouseEvent) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const y = e.clientY - rect.top
        setDir(y < rect.height / 2 ? "top" : "bottom")
    }
    const onLeave = () => setDir("none")

    const fontObj = font || {}
    const rawSize = fontObj.fontSize
    const size =
        typeof rawSize === "string" ? parseFloat(rawSize) : rawSize || 24
    // Increased from 0.72 to 1.2 to prevent clipping the top of capital letters and ascenders
    const lineBox = size * 1.2
    const gapPx = (gap || 0) * 3
    const step = lineBox + gapPx

    const yByDir = { none: -step, top: 0, bottom: -2 * step }

    const labelStyle: React.CSSProperties = {
        ...fontObj,
        margin: 0,
        whiteSpace: "pre",
        lineHeight: 1.2,
        height: lineBox,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
    }

    return (
        <span
            ref={ref}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            style={{
                ...style,
                position: "relative",
                display: "inline-block",
                overflow: "hidden",
                height: lineBox,
                cursor: "pointer",
                userSelect: "none",
            }}
        >
            <span
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: gapPx,
                    transform: `translateY(${yByDir[dir]}px)`,
                    transition: transitionToCss(transition),
                }}
            >
                <span style={{ ...labelStyle, color: hoverColor }}>
                    {title}
                </span>
                <span style={{ ...labelStyle, color: textColor }}>{title}</span>
                <span style={{ ...labelStyle, color: hoverColor }}>
                    {title}
                </span>
            </span>
        </span>
    )
}

const COMPONENT_DEFAULTS = {
    title: "LINK",
    font: {
        fontSize: 16,
        fontFamily: "var(--font-plus-jakarta)",
        fontWeight: 600,
        letterSpacing: "0em",
        lineHeight: "1em",
    },
    gap: 4,
    textColor: "inherit",
    hoverColor: "#B5723B",
    transition: {
        type: "tween",
        duration: 0.3,
        delay: 0,
        ease: "easeInOut",
    },
}

const __originkitPresetProps = {};

export default function DirectionHover(props: Record<string, unknown>) {
  return <OriginkitBase_DirectionHover {...(__originkitPresetProps as Record<string, unknown>)} {...props} />;
}
