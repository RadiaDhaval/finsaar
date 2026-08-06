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
    "bg-copper text-white hover:bg-copper-dark shadow-lg shadow-copper/20 hover:shadow-copper/30",
  secondary:
    "bg-transparent text-navy border-2 border-navy hover:bg-navy hover:text-white",
  ghost:
    "bg-transparent text-copper hover:text-copper-dark underline underline-offset-4 decoration-copper/30 hover:decoration-copper",
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
        font-heading font-semibold rounded-lg cursor-pointer
        transition-colors duration-300 ease-out
        inline-flex items-center justify-center gap-2
        min-h-[44px] min-w-[44px]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
