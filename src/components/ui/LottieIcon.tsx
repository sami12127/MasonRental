import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useReducedMotion } from "framer-motion";

interface LottieIconProps {
  /** Pad naar het Lottie-JSON in /public (bv. "/lottie_animations/door.json"). */
  src: string;
  /** Sizing-classes voor de container (bv. "size-16"). */
  className?: string;
  loop?: boolean;
}

/* Eén keer opgehaalde animaties worden gecachet, zodat dezelfde animatie op
   meerdere kaarten niet telkens opnieuw wordt gedownload. */
const cache = new Map<string, object>();

/**
 * Rendert een Lottie-animatie als icoon. Respecteert prefers-reduced-motion:
 * dan wordt de animatie stilgezet op het eerste frame.
 */
export function LottieIcon({ src, className, loop = true }: LottieIconProps) {
  const [data, setData] = useState<object | null>(() => cache.get(src) ?? null);
  const reduceMotion = useReducedMotion();

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

  return (
    <span className={className} aria-hidden="true">
      {data && (
        <Lottie
          animationData={data}
          loop={reduceMotion ? false : loop}
          autoplay={!reduceMotion}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </span>
  );
}
