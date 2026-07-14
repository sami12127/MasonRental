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
      {/* Achtergrondfoto full-bleed. De auto staat rechts in beeld, dus de
         tekst staat links; die zijde wordt extra verdonkerd voor contrast. */}
      <div className="absolute inset-0">
        <motion.img
          src="/hero-rs3.webp"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[71%_50%] sm:object-center"
          initial={reduceMotion ? undefined : { scale: 1.08 }}
          animate={reduceMotion ? undefined : { scale: 1 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
        />
        {/* Links-naar-rechts verloop: tekstzijde donker, auto blijft zichtbaar */}
        <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/55 to-transparent sm:via-night/45" />
        {/* Extra verduistering op mobiel voor contrast */}
        <div className="absolute inset-0 bg-night/25 sm:bg-transparent" />
        {/* Subtiele top-fade voor navbar-leesbaarheid */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-night/60 to-transparent" />
        {/* Zachte, hoge fade naar de sectie eronder — geen zichtbare naad */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-night via-night/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-end px-6 pb-16 pt-24 sm:items-center sm:py-10 sm:pt-20 lg:px-10">
        <div className="w-full max-w-xl text-left sm:max-w-2xl">
          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl sm:leading-[1.02] md:text-7xl"
          >
            Huur jouw droom<span className="text-gold">auto</span>.
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="mt-5 max-w-lg text-sm leading-relaxed text-white/80 sm:mt-6 sm:text-lg"
          >
            Ervaar pure prestaties, comfort en uitstraling. Stap vandaag nog in een
            auto die elke rit bijzonder maakt — zorgeloos huren vanaf 18 jaar.
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
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
