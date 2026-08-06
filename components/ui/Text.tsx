import { type HTMLAttributes } from "react";

type TextSize = "sm" | "base" | "lg" | "xl";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize;
  muted?: boolean;
  children: React.ReactNode;
  className?: string;
}

const sizeStyles: Record<TextSize, string> = {
  sm: "text-sm leading-relaxed",
  base: "text-base leading-relaxed",
  lg: "text-lg leading-relaxed",
  xl: "text-xl leading-relaxed",
};

export default function Text({
  size = "base",
  muted = false,
  children,
  className = "",
  ...props
}: TextProps) {
  return (
    <p
      className={`
        font-body
        ${sizeStyles[size]}
        ${muted ? "text-navy/60" : "text-navy"}
        ${className}
      `}
      {...props}
    >
      {children}
    </p>
  );
}
