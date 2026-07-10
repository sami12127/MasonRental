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
      {/* Achtergrondfoto full-bleed achter de tekst. Op mobiel de staande
         RS3-foto, vanaf sm de duo-foto. */}
      <div className="absolute inset-0">
        {/* Mobiel — staande RS3-foto */}
        <motion.img
          src="/cars/rs3-6565.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center sm:hidden"
          initial={reduceMotion ? undefined : { scale: 1.08 }}
          animate={reduceMotion ? undefined : { scale: 1 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
        />
        {/* Desktop — duo-foto full-bleed */}
        <motion.img
          src="/cars/rs3-01.webp"
          alt=""
          aria-hidden="true"
          className="hidden h-full w-full object-cover object-center sm:block"
          initial={reduceMotion ? undefined : { scale: 1.08 }}
          animate={reduceMotion ? undefined : { scale: 1 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
        />
        {/* Donkere scrims — meer contrast, foto blijft zichtbaar */}
        <div className="absolute inset-0 bg-night/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/40 to-night/50" />
      </div>

      <div className="relative z-10 flex w-full flex-1 items-end justify-center px-6 pb-16 pt-24 sm:items-center sm:py-10 sm:pt-20 lg:px-10">
        <div className="mx-auto w-full max-w-7xl text-left sm:max-w-3xl sm:text-center">
          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl sm:leading-[1.02] md:text-7xl"
          >
            Huur jouw droom<span className="text-gold">auto</span>.
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="mt-5 max-w-lg text-sm leading-relaxed text-white/80 sm:mx-auto sm:mt-6 sm:text-lg"
          >
            Ervaar pure prestaties, comfort en uitstraling. Stap vandaag nog in een
            auto die elke rit bijzonder maakt — zorgeloos huren vanaf 18 jaar.
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-center"
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
