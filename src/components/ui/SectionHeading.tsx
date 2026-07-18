import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  /* Optioneel woord dat in goud achter de titel verschijnt */
  titleAccent?: string;
  description?: string;
  /* "tight" verkleint de marges zodat kop + inhoud in één oogopslag passen */
  spacing?: "default" | "tight";
}

export function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  description,
  spacing = "default",
}: SectionHeadingProps) {
  const tight = spacing === "tight";

  return (
    <Reveal
      className={`mx-auto max-w-2xl text-center ${
        tight ? "mb-6 md:mb-8" : "mb-14 md:mb-20"
      }`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
        {title}
        {titleAccent && <span className="text-gold"> {titleAccent}</span>}
      </h2>
      {description && (
        <p
          className={`text-base leading-relaxed text-mist ${
            tight ? "mt-4" : "mt-6"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
