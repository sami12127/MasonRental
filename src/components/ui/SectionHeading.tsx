import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      <div className="mx-auto mt-6 h-px w-16 bg-gold/60" aria-hidden="true" />
      {description && (
        <p className="mt-6 text-base leading-relaxed text-mist">{description}</p>
      )}
    </Reveal>
  );
}
