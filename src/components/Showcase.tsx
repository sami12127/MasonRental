import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./ui/Reveal";

/* Foto's voor de carrousel — vervang of vul aan via /public/cars.
   Alle slides zijn liggend (3:2) zodat ze consistent in het kader vallen. */
const slides = [
  "/cars/rs3-15-show.webp", // RS6 + RS3 samen
  "/cars/rs6-2-show.webp", // RS6
  "/cars/rs3-6573-show.webp", // RS3 zijaanzicht
  "/cars/rs3-6570-show.webp", // RS3 vooraanzicht
];

const AUTOPLAY_MS = 3000;

export function Showcase() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((i: number) => setIndex(i), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      AUTOPLAY_MS
    );
    return () => clearInterval(timer);
  }, [reduceMotion, index]);

  /* Swipe op mobiel: horizontale veeg wisselt van foto. */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section className="bg-night pb-24 pt-20 md:pb-32 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Split: tekst links, carrousel rechts (iets breder) */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
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
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-charcoal touch-pan-y select-none"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="relative aspect-[4/3]">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.img
                    key={index}
                    src={slides[index]}
                    alt={`Mason Rental auto ${index + 1}`}
                    draggable={false}
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
