import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Behouden voor API-compatibiliteit; heeft geen effect meer. */
  delay?: number;
  className?: string;
}

/** Rendert de inhoud direct, zonder scroll-reveal-animatie. */
export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}
