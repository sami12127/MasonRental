import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Reveal } from "./ui/Reveal";

/* Foto's voor de carrousel — vervang of vul aan via /public/cars */
const slides = [
  "/cars/rs3-15.jpg", // RS6 + RS3 samen
  "/cars/rs6-2.jpg", // RS6
  "/cars/rs3-6573.jpg", // RS3
  "/cars/rs3-6570.jpg", // RS3
];

const AUTOPLAY_MS = 3000;

export function Showcase() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((i: number) => setIndex(i), []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      AUTOPLAY_MS
    );
    return () => clearInterval(timer);
  }, [reduceMotion, index]);

  return (
    <section className="bg-night pb-24 pt-20 md:pb-32 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Split: tekst links, carrousel rechts */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
                De perfecte auto voor jouw moment
              </p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                Jouw <span className="text-gold">droom</span>auto huren.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg">
                Bij Mason Rental ben je aan het juiste adres voor het huren van
                een exclusieve auto. Voor een bijzondere gelegenheid of gewoon om
                te genieten van luxe en stijl — wij hebben een passend aanbod om
                uit te kiezen.
              </p>
              <a
                href="#aanbod"
                className="group mt-9 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-night transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_36px_-8px_var(--color-gold)] active:scale-[0.97]"
              >
                Bekijk het aanbod
                <ArrowRightIcon
                  size={16}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-charcoal">
              <div className="relative aspect-[4/3]">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.img
                    key={index}
                    src={slides[index]}
                    alt={`Mason Rental auto ${index + 1}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div
                  className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Navigatiebolletjes */}
              <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Toon foto ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-6 bg-gold"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
