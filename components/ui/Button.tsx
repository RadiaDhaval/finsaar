"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "relative overflow-hidden bg-gradient-to-br from-[#c68953] via-[#B5723B] to-[#9a5d2b] text-white border border-[#a1602c] shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_20px_-8px_rgba(181,114,59,0.8)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_15px_30px_-10px_rgba(181,114,59,1)] group",
  secondary:
    "relative overflow-hidden bg-transparent text-navy border border-navy shadow-sm hover:bg-navy/5 hover:shadow-[0_15px_30px_-10px_rgba(10,25,47,0.1)] group",
  ghost:
    "bg-transparent text-copper hover:bg-copper/10 group",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-9 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      className={`
        font-heading font-semibold rounded-xl cursor-pointer
        transition-all duration-300 ease-out
        inline-flex items-center justify-center gap-2
        min-h-[44px] min-w-[44px]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.96, y: 0 }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant !== "ghost" && (
        <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1.5s] ease-in-out skew-x-12 z-0" />
      )}
    </motion.button>
  );
}
