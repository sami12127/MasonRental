import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRightIcon, StarIcon } from "@phosphor-icons/react";

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
      className="relative flex min-h-dvh items-center overflow-hidden"
    >
      {/* Achtergrondfoto. Vervang eventueel via /public/cars */}
      <motion.img
        src="/cars/rs3-01.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        initial={reduceMotion ? undefined : { scale: 1.08 }}
        animate={reduceMotion ? undefined : { scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      />
      {/* Lichte scrims — net genoeg voor leesbaarheid, foto blijft goed zichtbaar */}
      <div className="absolute inset-0 bg-night/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-night/20" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-20 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            {...fadeUp(0.1)}
            className="text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Huur jouw
            <br />
            droom<span className="text-gold">auto</span>.
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
            <a
              href="#aanbod"
              className="group inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-night transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_36px_-8px_var(--color-gold)] active:scale-[0.97]"
            >
              Ontdek ons aanbod
              <ArrowUpRightIcon
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="#contact"
              className="group inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/30 bg-white/[0.06] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Maak een reservering
              <ArrowUpRightIcon
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          {/* Beoordeling — vervang door je echte Google-score */}
          <motion.div
            {...fadeUp(0.55)}
            className="mt-7 flex items-center justify-center gap-2.5"
          >
            <span className="text-sm font-semibold text-white">4,3/5 op Google</span>
            <div className="flex gap-0.5" role="img" aria-label="4,3 van 5 sterren">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  size={16}
                  weight="fill"
                  className="text-gold"
                  aria-hidden="true"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
