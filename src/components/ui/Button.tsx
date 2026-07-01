import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "gold" | "outline";
  children: ReactNode;
}

const base =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 active:scale-[0.97]";

const variants = {
  gold: "bg-gold text-night hover:bg-gold-light hover:shadow-[0_0_32px_-8px_var(--color-gold)]",
  outline:
    "border border-white/25 text-white hover:border-gold hover:text-gold",
};

export function Button({ variant = "gold", children, className = "", ...rest }: ButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
