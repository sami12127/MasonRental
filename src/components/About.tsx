import { Reveal } from "./ui/Reveal";

export function About() {
  return (
    <section id="over-ons" className="bg-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Over Mason Rental
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Alleen het beste is goed genoeg
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gold/60" aria-hidden="true" />
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-lg leading-relaxed text-white/70">
            Mason Rental staat voor exclusieve autoverhuur zonder gedoe. Wij bieden
            een zorgvuldig geselecteerd wagenpark met high-performance auto's voor
            klanten die alleen genoegen nemen met het beste.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
