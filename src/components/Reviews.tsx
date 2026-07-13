import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CaretLeftIcon, CaretRightIcon, StarIcon } from "@phosphor-icons/react";
import { reviews } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";

const AUTOPLAY_MS = 6000;

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();

  const go = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [go, reduceMotion, index]);

  const review = reviews[index];

  return (
    <section className="bg-night pt-10 pb-24 md:pt-12 md:pb-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <SectionHeading eyebrow="Reviews" title="Wat onze klanten zeggen" />

        <div className="relative rounded-3xl border border-white/10 bg-charcoal p-8 md:p-12">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 48 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -48 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-center"
              >
                <div
                  className="mb-6 flex justify-center gap-1"
                  role="img"
                  aria-label="5 van 5 sterren"
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <StarIcon key={s} size={20} weight="fill" className="text-gold" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="min-h-24 text-lg leading-relaxed text-white/85 md:text-xl">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-gold">
                  {review.name}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Vorige review"
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              <CaretLeftIcon size={20} weight="bold" />
            </button>
            <div className="flex gap-2" aria-hidden="true">
              {reviews.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-gold" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Volgende review"
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              <CaretRightIcon size={20} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
