import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  /* Optioneel woord dat in goud in de titel verschijnt */
  titleAccent?: string;
  description?: string;
  /* Optionele achtergrondfoto — anders een strakke nachtblauwe band */
  image?: string;
  imageAlt?: string;
  /* Compactere band: minder verticale ruimte, tekst zit hoger */
  compact?: boolean;
}

/**
 * Kop-band bovenaan een aparte pagina (bv. /aanbod, /over-ons).
 * Reserveert ruimte voor de vaste navbar en geeft elke pagina een
 * duidelijke, eigen titel zodat de site niet als één lange pagina leest.
 */
export function PageHero({
  eyebrow,
  title,
  titleAccent,
  description,
  image,
  imageAlt = "",
  compact = false,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={
        compact
          ? "relative overflow-hidden bg-night pt-28 pb-10 sm:pt-32 md:pt-32 md:pb-14"
          : "relative overflow-hidden bg-night pt-32 pb-16 sm:pt-40 md:pt-44 md:pb-24"
      }
    >
      {image && (
        <>
          <motion.img
            src={image}
            alt={imageAlt}
            aria-hidden={imageAlt ? undefined : true}
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduceMotion ? undefined : { scale: 1.08 }}
            animate={reduceMotion ? undefined : { scale: 1 }}
            transition={{ duration: 2.4, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-night/80" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/60"
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal>
          {eyebrow && (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            {title}
            {titleAccent && <span className="text-gold"> {titleAccent}</span>}
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/60" aria-hidden="true" />
        </Reveal>
        {description && (
          <Reveal delay={0.15}>
            <p className="mt-8 text-lg leading-relaxed text-white/70">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
