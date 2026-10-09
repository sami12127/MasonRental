import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";

/* lottie-web is groot; pas laden wanneer er echt een animatie getoond wordt,
   zodat het niet in de eerste bundel zit. */
const Lottie = lazy(() => import("lottie-react"));

interface LottieIconProps {
  /** Pad naar het Lottie-JSON in /public (bv. "/lottie_animations/door.json"). */
  src: string;
  /** Sizing-classes voor de container (bv. "size-16"). */
  className?: string;
  loop?: boolean;
  /**
   * Controlled modus: als gezet, staat de animatie stil op frame 0 en speelt
   * hij alleen af zolang `playing` true is (bv. bij hover). Undefined = het
   * standaardgedrag: automatisch afspelen.
   */
  playing?: boolean;
}

/* Eén keer opgehaalde animaties worden gecachet, zodat dezelfde animatie op
   meerdere kaarten niet telkens opnieuw wordt gedownload. */
const cache = new Map<string, object>();

/* Wacht tot de browser na het laden van de pagina even niets te doen heeft,
   zodat Lottie niet concurreert met de eerste weergave. */
const idle = new Promise<void>((resolve) => {
  if (typeof window === "undefined") return; // prerender: nooit laden
  const schedule = () =>
    "requestIdleCallback" in window
      ? window.requestIdleCallback(() => resolve(), { timeout: 2000 })
      : setTimeout(resolve, 1);
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
});

/**
 * Rendert een Lottie-animatie als icoon. Respecteert prefers-reduced-motion:
 * dan wordt de animatie stilgezet op het eerste frame.
 *
 * De animatie wordt pas opgehaald en gestart als het icoon (bijna) in beeld
 * komt, en pauzeert zodra het uit beeld is — dat scheelt veel rekenwerk bij
 * het laden van de pagina.
 */
export function LottieIcon({ src, className, loop = true, playing }: LottieIconProps) {
  const [data, setData] = useState<object | null>(null);
  const [nearView, setNearView] = useState(false);
  const reduceMotion = useReducedMotion();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const inView = useRef(false);
  const controlled = playing !== undefined;

  /* Houd bij of het icoon in (of vlak bij) beeld is. */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setNearView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) setNearView(true);
        /* Automatisch afspelende animaties pauzeren buiten beeld. */
        const api = lottieRef.current;
        if (!api || controlled || reduceMotion) return;
        if (entry.isIntersecting) api.play();
        else api.pause();
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [controlled, reduceMotion]);

  useEffect(() => {
    if (!nearView) return;
    if (cache.has(src)) {
      setData(cache.get(src)!);
      return;
    }
    let active = true;
    idle
      .then(() => fetch(src))
      .then((res) => res.json())
      .then((json: object) => {
        cache.set(src, json);
        if (active) setData(json);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [src, nearView]);

  /* Controlled modus: speel af bij `playing`, zet anders stil op frame 0. */
  useEffect(() => {
    if (!controlled || reduceMotion) return;
    const api = lottieRef.current;
    if (!api || !data) return;
    if (playing) api.play();
    else api.goToAndStop(0, true);
  }, [playing, controlled, reduceMotion, data]);

  return (
    <span ref={containerRef} className={className} aria-hidden="true">
      {data && (
        <Suspense fallback={null}>
          <Lottie
            lottieRef={lottieRef}
            animationData={data}
            loop={reduceMotion ? false : loop}
            autoplay={controlled ? false : !reduceMotion && inView.current}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      )}
    </span>
  );
}
