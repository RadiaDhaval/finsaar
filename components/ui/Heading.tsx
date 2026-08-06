import { type ElementType, type HTMLAttributes } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight",
  h2: "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight",
  h3: "text-2xl md:text-3xl font-bold leading-snug",
  h4: "text-xl md:text-2xl font-semibold leading-snug",
};

export default function Heading({
  as: Tag = "h2",
  children,
  className = "",
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={`font-heading text-navy ${headingStyles[Tag]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
