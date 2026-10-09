import { RESPONSIVE_IMAGES } from "../data/responsiveImages";

const WIDTHS = [640, 960, 1280];

/**
 * Geeft src/srcSet/sizes voor een foto, zodat de browser een passend kleinere
 * variant (-640 / -960 / -1280) kiest i.p.v. altijd het volledige origineel.
 *
 * `sizes` beschrijft de breedte van het vak (bv. "(min-width: 1024px) 25vw, 100vw").
 * Met `boxAspect` (breedte/hoogte van het vak) wordt rekening gehouden met
 * object-cover: een bredere foto in een smal vak heeft naar verhouding meer
 * pixels nodig, dus worden de vw-waarden in `sizes` opgeschaald.
 */
export function responsiveImg(src: string, sizes: string, boxAspect?: number) {
  const meta = RESPONSIVE_IMAGES[src];
  if (!meta) return { src };

  const base = src.replace(/\.webp$/, "");
  const srcSet = [
    ...WIDTHS.filter((w) => w < meta.w).map((w) => `${base}-${w}.webp ${w}w`),
    `${src} ${meta.w}w`,
  ].join(", ");

  const factor = boxAspect ? Math.max(1, meta.w / meta.h / boxAspect) : 1;
  const scaledSizes =
    factor > 1
      ? sizes
          .split(",")
          .map((entry) => {
            const [, media = "", value] = entry.trim().match(/^(\([^)]*\)\s+)?(.+)$/)!;
            return `${media}calc(${value} * ${factor.toFixed(2)})`;
          })
          .join(", ")
      : sizes;

  return { src, srcSet, sizes: scaledSizes };
}
