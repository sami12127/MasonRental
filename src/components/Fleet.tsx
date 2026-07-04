import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cars, upcomingCars } from "../data/cars";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Fleet() {
  return (
    <section id="aanbod" className="bg-night pt-20 pb-14 md:pt-28 md:pb-16">
      {/* Bredere sectie dan de rest van de site, zodat 4 grote kaarten
         naast elkaar passen. Responsieve max-breedte = nooit horizontale scroll. */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <SectionHeading
          title="Ons"
          titleAccent="aanbod"
          description="Een zorgvuldig geselecteerd wagenpark met high-performance auto's, altijd in perfecte staat en klaar voor jouw moment."
          spacing="tight"
        />

        {/* 1 kolom mobiel, 2 op tablet, alle 4 naast elkaar op desktop */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {cars.map((car, i) => {
            const hoverImage = car.hoverImage ?? car.gallery[1] ?? car.gallery[0];
            return (
              <Reveal key={car.id} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full"
                >
                  <Link
                    to={`/auto/${car.id}`}
                    aria-label={`Bekijk de ${car.name}`}
                    className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10"
                  >
                    {/* Basisfoto — vervaagt bij hover */}
                    <img
                      src={car.image}
                      alt={car.name}
                      loading="lazy"
                      width={1400}
                      height={875}
                      className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                    />
                    {/* Tweede foto — verschijnt bij hover (eager geladen voor een vloeiende wissel) */}
                    <img
                      src={hoverImage}
                      alt=""
                      aria-hidden="true"
                      width={1400}
                      height={875}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/45 to-transparent"
                      aria-hidden="true"
                    />
                    {/* Gouden gloed die bij hover onderin de card omhoog komt */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gold/55 via-gold/15 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                      aria-hidden="true"
                    />

                    <div className="relative z-10 p-6 md:p-7">
                      <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                        {car.bodyType}
                      </p>
                      <h3 className="mt-1.5 text-2xl font-extrabold leading-tight text-white md:text-[1.65rem]">
                        {car.name}
                      </h3>

                      <span className="mt-3.5 inline-flex items-center rounded-full bg-gold px-4 py-1.5 text-base font-extrabold uppercase tracking-wide text-night">
                        € {car.pricePerDay} p/d
                      </span>

                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wider text-white/55">
                            Transmissie
                          </p>
                          <p className="mt-1 text-base font-bold text-white">
                            {car.transmission}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium uppercase tracking-wider text-white/55">
                            Deuren
                          </p>
                          <p className="mt-1 text-base font-bold text-white">
                            {car.doors}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}

          {/* Binnenkort beschikbaar — teaser-cards zonder detailpagina.
             Foto in grijstinten + duidelijke 'binnenkort'-banner. */}
          {upcomingCars.map((car, i) => {
            const hoverImage = car.hoverImage ?? car.image;
            return (
              <Reveal key={car.name} delay={(cars.length + i) * 0.12}>
                <div className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 bg-charcoal">
                  {/* Exterieurfoto — grijs & gedimd zodat het als 'nog niet beschikbaar' leest */}
                  <img
                    src={car.image}
                    alt={car.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover grayscale brightness-[0.55] transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
                  />
                  {/* Interieurfoto bij hover */}
                  <img
                    src={hoverImage}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-0 grayscale brightness-[0.55] transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/55 to-night/30"
                    aria-hidden="true"
                  />

                  {/* Hoek-vlaggetje dat om de linkerbovenhoek van de kaart valt */}
                  <div className="pointer-events-none absolute left-0 top-0 z-20 h-[170px] w-[170px] overflow-hidden">
                    <span className="absolute left-[-60px] top-[38px] w-[240px] -rotate-45 bg-gold py-1.5 text-center text-[0.58rem] font-extrabold uppercase tracking-[0.04em] text-night shadow-[0_3px_10px_rgba(0,0,0,0.45)]">
                      Binnenkort beschikbaar
                    </span>
                  </div>

                  <div className="relative z-10 p-6 md:p-7">
                    <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                      {car.bodyType}
                    </p>
                    <h3 className="mt-1.5 text-2xl font-extrabold leading-tight text-white md:text-[1.65rem]">
                      {car.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {car.tagline}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
