import { Reveal } from "./ui/Reveal";

export function YoungDriver() {
  return (
    <section className="bg-night px-6 pt-6 pb-4 md:pt-8 md:pb-5 lg:px-10">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
          Ook voor jonge bestuurders
        </p>
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
          Al op je 18e <span className="text-gold">de weg op</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-mist">
          Net je rijbewijs? Geen probleem. Bij Mason Rental stap je al vanaf je
          achttiende achter het stuur. Perfect voor een uitje, een speciale
          gelegenheid of een weekendje weg — helder geprijsd en zonder
          ingewikkelde voorwaarden.
        </p>
      </Reveal>
    </section>
  );
}
