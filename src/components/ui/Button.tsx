import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "gold" | "outline";
  children: ReactNode;
}

const base =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-none px-8 py-3 text-sm font-medium tracking-wide transition-all duration-300 active:scale-[0.97]";

const variants = {
  gold: "btn-sweep [--sweep:var(--color-night)] bg-gold text-night hover:text-gold",
  outline:
    "btn-sweep [--sweep:var(--color-gold)] border border-white/25 text-white hover:border-gold hover:text-night",
};

export function Button({ variant = "gold", children, className = "", ...rest }: ButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
