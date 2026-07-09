import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
  });

  return (
    <section
      id="home"
      className="relative flex min-h-dvh flex-col overflow-hidden sm:items-center"
    >
      {/* Achtergrondfoto. Op mobiel een uitgezoomde bovenband zodat beide
         auto's zichtbaar blijven; vanaf sm full-bleed achter de tekst. */}
      <div className="relative h-[44vh] min-h-[15rem] w-full shrink-0 sm:absolute sm:inset-0 sm:h-full">
        <motion.img
          src="/cars/rs3-01.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[28%_55%] sm:object-center"
          initial={reduceMotion ? undefined : { scale: 1.08 }}
          animate={reduceMotion ? undefined : { scale: 1 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
        />
        {/* Donkere scrims — meer contrast, foto blijft zichtbaar */}
        <div className="absolute inset-0 bg-night/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/40 to-night/50" />
        {/* Zachte overgang van de mobiele band naar de donkere tekstzone */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-night to-transparent sm:hidden" />
      </div>

      <div className="relative z-10 flex w-full flex-1 items-center justify-center px-6 py-10 sm:absolute sm:inset-0 sm:py-0 sm:pt-20 lg:px-10">
        <div className="mx-auto w-full max-w-3xl text-center">
          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Huur jouw droom<span className="text-gold">auto</span>.
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Ervaar pure prestaties, comfort en uitstraling. Stap vandaag nog in een
            auto die elke rit bijzonder maakt — zorgeloos huren vanaf 18 jaar.
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              to="/aanbod"
              className="group inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-none bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-night transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_36px_-8px_var(--color-gold)] active:scale-[0.97]"
            >
              Ontdek ons aanbod
              <ArrowUpRightIcon
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-none border border-white/30 bg-white/[0.06] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Maak een reservering
              <ArrowUpRightIcon
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
