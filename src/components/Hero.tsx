import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FlameIcon } from "@phosphor-icons/react";
import { Button } from "./ui/Button";
import { BrandMarquee } from "./BrandMarquee";

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
      className="relative flex min-h-dvh items-center overflow-hidden p-3 pt-20 sm:p-4 sm:pt-24 md:p-6 md:pt-28"
    >
      {/* Achtergrondfoto van de Audi RS3. Vervang eventueel via /public/cars */}
      <motion.img
        src="/cars/rs3-6567.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        initial={reduceMotion ? undefined : { scale: 1.08 }}
        animate={reduceMotion ? undefined : { scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-night/40" />

      {/* Vertikale card met de tekstinhoud */}
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 ml-4 mr-auto flex w-full max-w-lg flex-col rounded-[2.5rem] border border-white/10 bg-charcoal/95 p-8 py-14 shadow-2xl backdrop-blur-xl sm:ml-12 sm:p-12 sm:py-20 md:ml-24 md:p-14 md:py-28"
      >
        {/* Populair-badge — gouden markering verschuift naar de auto bij hover */}
        <motion.div {...fadeUp(0.1)}>
          <Link
            to="/auto/audi-rs3-8y"
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1.5 transition-colors duration-300 hover:border-gold/40"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-colors duration-300 bg-gold text-night group-hover:bg-transparent group-hover:text-gold">
              <FlameIcon size={13} weight="fill" aria-hidden="true" />
              Populair
            </span>
            <span className="rounded-full px-4 py-1.5 text-sm font-bold transition-colors duration-300 text-gold group-hover:bg-gold group-hover:text-night">
              Audi RS3 8Y
            </span>
          </Link>
        </motion.div>

        <motion.h1
          {...fadeUp(0.25)}
          className="mt-10 text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:mt-12 md:text-6xl"
        >
          Huur jouw
          <br />
          droom<span className="text-gold">auto</span>.
        </motion.h1>

        <motion.p
          {...fadeUp(0.4)}
          className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Op zoek naar een auto voor een bruiloft, feest, dagje uit of vakantie? Bij
          Mason Rental regelen we het voor je. Huur zorgeloos vanaf 18 jaar en geniet
          van scherpe tarieven en onze topservice.
        </motion.p>

        <motion.div {...fadeUp(0.55)} className="mt-9">
          <Button href="#aanbod" className="font-bold uppercase tracking-wide">
            Huur 'm direct!
          </Button>
        </motion.div>

        {/* Merken die we aanbieden — binnen de card */}
        <motion.div {...fadeUp(0.7)} className="mt-10 border-t border-white/10 pt-8">
          <BrandMarquee />
        </motion.div>
      </motion.div>
    </section>
  );
}
