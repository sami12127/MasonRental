import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";

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

/**
 * Rendert een Lottie-animatie als icoon. Respecteert prefers-reduced-motion:
 * dan wordt de animatie stilgezet op het eerste frame.
 */
export function LottieIcon({ src, className, loop = true, playing }: LottieIconProps) {
  const [data, setData] = useState<object | null>(() => cache.get(src) ?? null);
  const reduceMotion = useReducedMotion();
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const controlled = playing !== undefined;

  useEffect(() => {
    if (cache.has(src)) {
      setData(cache.get(src)!);
      return;
    }
    let active = true;
    fetch(src)
      .then((res) => res.json())
      .then((json: object) => {
        cache.set(src, json);
        if (active) setData(json);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [src]);

  /* Controlled modus: speel af bij `playing`, zet anders stil op frame 0. */
  useEffect(() => {
    if (!controlled || reduceMotion) return;
    const api = lottieRef.current;
    if (!api || !data) return;
    if (playing) api.play();
    else api.goToAndStop(0, true);
  }, [playing, controlled, reduceMotion, data]);

  return (
    <span className={className} aria-hidden="true">
      {data && (
        <Lottie
          lottieRef={lottieRef}
          animationData={data}
          loop={reduceMotion ? false : loop}
          autoplay={controlled ? false : !reduceMotion}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </span>
  );
}
