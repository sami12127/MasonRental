import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { cars } from "../data/cars";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Fleet() {
  return (
    <section id="aanbod" className="bg-night pt-6 pb-14 md:pt-8 md:pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          title="Ons"
          titleAccent="aanbod"
          description="Een zorgvuldig geselecteerd wagenpark met high-performance auto's, altijd in perfecte staat en klaar voor jouw moment."
          spacing="tight"
        />

        {/* Bij meer auto's kun je dit uitbreiden naar lg:grid-cols-3 of 4 */}
        <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
          {cars.map((car, i) => {
            const hoverImage = car.gallery[1] ?? car.gallery[0];
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
                    className="group relative flex aspect-[7/8] flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 shadow-none transition-shadow duration-300 hover:shadow-[0_38px_70px_-20px_rgba(201,163,78,0.55),0_14px_34px_-14px_rgba(201,163,78,0.4)]"
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
        </div>

        <Reveal className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-night transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_36px_-8px_var(--color-gold)] active:scale-[0.97]"
          >
            Bekijk volledig aanbod
            <ArrowRightIcon
              size={16}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
