import { motion, useReducedMotion } from "framer-motion";
import { ClockIcon, CrownIcon, SealCheckIcon } from "@phosphor-icons/react";
import { Button } from "./ui/Button";
import { heroImage } from "../data/cars";

const usps = [
  { icon: SealCheckIcon, label: "Vanaf 18 jaar" },
  { icon: ClockIcon, label: "Direct beschikbaar" },
  { icon: CrownIcon, label: "Premium service" },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
  });

  return (
    <section id="home" className="relative flex min-h-dvh items-center justify-center overflow-hidden">
      {/* Achtergrond: vervang door eigen foto of video van de Audi RS6 C8 */}
      <motion.img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        initial={reduceMotion ? undefined : { scale: 1.08 }}
        animate={reduceMotion ? undefined : { scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/55 to-night" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
        <motion.p
          {...fadeUp(0.1)}
          className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-gold"
        >
          Exclusieve autoverhuur
        </motion.p>
        <motion.h1
          {...fadeUp(0.25)}
          className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Huur jouw droomauto.
        </motion.h1>
        <motion.p
          {...fadeUp(0.4)}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          Exclusieve performance auto's voor iedere bijzondere gelegenheid.
        </motion.p>

        <motion.div
          {...fadeUp(0.55)}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="#aanbod">Bekijk aanbod</Button>
          <Button href="#contact" variant="outline">
            Reserveer direct
          </Button>
        </motion.div>

        <motion.ul
          {...fadeUp(0.75)}
          className="mx-auto mt-16 flex max-w-2xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:gap-4"
        >
          {usps.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md transition-colors duration-300 hover:border-gold/40"
            >
              <Icon size={20} weight="duotone" className="shrink-0 text-gold" aria-hidden="true" />
              <span className="text-sm font-medium text-white/90">{label}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
