import { Reveal } from "./ui/Reveal";

const DEFAULT_TEXT =
  "Mason Rental staat voor exclusieve autoverhuur zonder gedoe. Wij bieden een zorgvuldig geselecteerd wagenpark met high-performance auto's voor klanten die alleen genoegen nemen met het beste.";

interface AboutProps {
  /** Toon de sectiekop. Uit op de /over-ons-pagina, die al een PageHero heeft. */
  showHeading?: boolean;
  /** Alinea-tekst — zodat home en /over-ons een andere tekst kunnen tonen. */
  text?: string;
}

export function About({ showHeading = true, text = DEFAULT_TEXT }: AboutProps) {
  return (
    <section
      id="over-ons"
      className={`bg-night ${showHeading ? "py-24 md:py-32" : "pt-4 pb-16 md:pt-6 md:pb-24"}`}
    >
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        {showHeading && (
          <Reveal>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Over Mason Rental
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
              Alleen het beste is goed genoeg
            </h2>
          </Reveal>
        )}
        <Reveal delay={showHeading ? 0.15 : 0}>
          <p className={`text-lg leading-relaxed text-white/70 ${showHeading ? "mt-8" : ""}`}>
            {text}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
