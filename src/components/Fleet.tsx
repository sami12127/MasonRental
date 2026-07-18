import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { cars as allCars, upcomingCars, type Car, type UpcomingCar } from "../data/cars";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const ALL = "Alle";

interface FleetProps {
  /** Toon de sectiekop. Uit op de /aanbod-pagina, die al een PageHero heeft. */
  showHeading?: boolean;
  /** Toon het merk-filter (aanbod-pagina). */
  filterable?: boolean;
  /** Toon de "binnenkort beschikbaar"-teasers (standaard aan). */
  showUpcoming?: boolean;
  /** Beperk het aantal getoonde auto's — voor de homepage-teaser. */
  limit?: number;
  /** Eén call-to-action onder het grid — voor de homepage-teaser. */
  cta?: { label: string; to: string };
}

export function Fleet({
  showHeading = true,
  filterable = false,
  showUpcoming = true,
  limit,
  cta,
}: FleetProps) {
  const [activeBrand, setActiveBrand] = useState<string>(ALL);

  /** Merken worden dynamisch uit de data gehaald, dus nieuwe auto's
     verschijnen automatisch als filteroptie. */
  const brands = useMemo(() => {
    const set = new Set<string>();
    allCars.forEach((c) => set.add(c.brand));
    if (showUpcoming) upcomingCars.forEach((c) => set.add(c.brand));
    return [ALL, ...Array.from(set)];
  }, [showUpcoming]);

  const matches = (brand: string) => activeBrand === ALL || brand === activeBrand;

  const visibleCars = useMemo(() => {
    let list = allCars.filter((c) => matches(c.brand));
    if (limit != null) list = list.slice(0, limit);
    return list;
  }, [activeBrand, limit]);

  const visibleUpcoming = useMemo(() => {
    if (!showUpcoming) return [] as UpcomingCar[];
    return upcomingCars.filter((c) => matches(c.brand));
  }, [activeBrand, showUpcoming]);

  const resetFilters = () => setActiveBrand(ALL);

  const isEmpty = visibleCars.length === 0 && visibleUpcoming.length === 0;

  return (
    <section
      id="aanbod"
      className={`bg-night pb-14 md:pb-16 ${
        showHeading ? "pt-20 md:pt-28" : "pt-0 md:pt-0"
      }`}
    >
      {/* Bredere sectie dan de rest van de site, zodat 4 grote kaarten
         naast elkaar passen. Responsieve max-breedte = nooit horizontale scroll. */}
      <div className="mx-auto max-w-[1840px] px-6 lg:px-10">
        {showHeading && (
          <SectionHeading
            title="Ons"
            titleAccent="aanbod"
            description="Een zorgvuldig geselecteerd wagenpark met high-performance auto's, altijd in perfecte staat en klaar voor jouw moment."
            spacing="tight"
          />
        )}

        {filterable && (
          <div className="mb-8 md:mb-10">
            <FilterGroup
              label="Merk"
              options={brands}
              active={activeBrand}
              onSelect={setActiveBrand}
            />
          </div>
        )}

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-charcoal px-6 py-20 text-center">
            <p className="text-lg font-bold text-white">Geen auto's gevonden</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist">
              Er zijn geen auto's van dit merk beschikbaar. Bekijk het volledige
              aanbod.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 btn-sweep [--sweep:var(--color-night)] border-2 border-gold inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-gold px-6 text-sm font-semibold text-night transition-all duration-300 hover:text-gold active:scale-[0.98]"
            >
              Toon alles
            </button>
          </div>
        ) : (
          /* 1 kolom mobiel, 2 op tablet, alle 4 naast elkaar op desktop */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {visibleCars.map((car, i) => (
              <CarCard key={car.id} car={car} delay={i * 0.12} />
            ))}

            {visibleUpcoming.map((car, i) => (
              <UpcomingCard
                key={car.name}
                car={car}
                delay={(visibleCars.length + i) * 0.12}
              />
            ))}
          </div>
        )}

        {cta && (
          <Reveal className="mt-12 flex justify-center md:mt-14">
            <Link
              to={cta.to}
              className="group btn-sweep [--sweep:var(--color-night)] border-2 border-gold inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gold px-9 py-3.5 text-sm font-bold uppercase tracking-wide text-night transition-all duration-300 hover:text-gold active:scale-[0.97]"
            >
              {cta.label}
              <ArrowRightIcon
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------- Filter ---------- */

function FilterGroup({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3" role="group" aria-label={`Filter op ${label.toLowerCase()}`}>
      <span className="mr-1 text-sm font-semibold uppercase tracking-[0.15em] text-white/50 md:text-base">
        {label}
      </span>
      {options.map((option) => {
        const selected = active === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            aria-pressed={selected}
            className={`min-h-12 cursor-pointer rounded-lg px-5 text-base font-semibold transition-all duration-200 md:px-6 ${
              selected
                ? "bg-gold text-night"
                : "border border-white/15 text-white/70 hover:border-gold/50 hover:text-white"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Kaarten ---------- */

/* True zolang het scherm smal is (1 kolom). Op die breedte bestaat er geen
   hover, dus activeren we het kaart-effect op scroll i.p.v. op hover. */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

/* Geeft true zodra het element de horizontale middenband van het scherm raakt.
   Alleen actief wanneer `enabled` (mobiel), zodat desktop puur op hover werkt. */
function useActiveInView<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!enabled) {
      setActive(false);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled]);
  return [ref, active] as const;
}

function CarCard({ car, delay }: { car: Car; delay: number }) {
  const hoverImage = car.hoverImage ?? car.gallery[1] ?? car.gallery[0];
  const isMobile = useIsMobile();
  const [cardRef, inView] = useActiveInView<HTMLAnchorElement>(isMobile);
  /* Op mobiel activeert de kaart in het midden van het scherm hetzelfde
     effect als een hover op desktop: foto-wissel + gouden gloed. */
  const active = isMobile && inView;
  return (
    <Reveal delay={delay}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-full"
      >
        <Link
          ref={cardRef}
          to={`/auto/${car.id}`}
          aria-label={`Bekijk de ${car.name}`}
          className="group relative flex aspect-[5/7] flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10"
        >
          {/* Basisfoto — vervaagt bij hover (desktop) of in beeld (mobiel) */}
          <img
            src={car.image}
            alt={car.name}
            loading="lazy"
            width={1400}
            height={875}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0 ${
              active ? "scale-105 opacity-0" : ""
            }`}
          />
          {/* Tweede foto — verschijnt bij hover (eager geladen voor een vloeiende wissel) */}
          <img
            src={hoverImage}
            alt=""
            aria-hidden="true"
            width={1400}
            height={875}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 ${
              active ? "scale-105 opacity-100" : "opacity-0"
            }`}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/45 to-transparent"
            aria-hidden="true"
          />
          {/* Gouden gloed die onderin de card omhoog komt bij hover (desktop)
             of wanneer de kaart in beeld staat (mobiel). */}
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gold/55 via-gold/15 to-transparent transition-opacity duration-500 ease-out group-hover:opacity-100 ${
              active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />

          <div className="relative z-10 p-6 md:p-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
              {car.bodyType}
            </p>
            <h3 className="mt-1.5 text-2xl font-extrabold leading-tight text-white md:text-[1.65rem]">
              {car.name}
            </h3>

            <span className="mt-3.5 inline-flex items-center rounded-full bg-gold px-4 py-1.5 text-base font-extrabold uppercase tracking-wide text-night">
              € {car.pricePerDay} p/d
            </span>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/55">
                  Transmissie
                </p>
                <p className="mt-1 text-base font-bold text-white">
                  {car.transmission}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium uppercase tracking-wider text-white/55">
                  Deuren
                </p>
                <p className="mt-1 text-base font-bold text-white">{car.doors}</p>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </Reveal>
  );
}

/* Binnenkort beschikbaar — teaser-cards zonder detailpagina.
   Foto in grijstinten + duidelijke 'binnenkort'-banner. */
function UpcomingCard({ car, delay }: { car: UpcomingCar; delay: number }) {
  const hoverImage = car.hoverImage ?? car.image;
  return (
    <Reveal delay={delay}>
      <div className="group relative flex aspect-[5/7] flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 bg-charcoal">
        {/* Exterieurfoto — grijs & gedimd zodat het als 'nog niet beschikbaar' leest */}
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover grayscale brightness-[0.55] transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
        />
        {/* Interieurfoto bij hover */}
        <img
          src={hoverImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-0 grayscale brightness-[0.55] transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-night/95 via-night/55 to-night/30"
          aria-hidden="true"
        />

        {/* Horizontaal vlaggetje vanaf de linkerrand */}
        <div className="pointer-events-none absolute left-0 top-6 z-20">
          <span className="inline-flex items-center bg-gold py-1.5 pl-5 pr-7 text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-night shadow-[0_3px_10px_rgba(0,0,0,0.4)] [clip-path:polygon(0_0,100%_0,calc(100%-11px)_50%,100%_100%,0_100%)]">
            Binnenkort beschikbaar
          </span>
        </div>

        <div className="relative z-10 p-6 md:p-7">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
            {car.bodyType}
          </p>
          <h3 className="mt-1.5 text-2xl font-extrabold leading-tight text-white md:text-[1.65rem]">
            {car.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60">{car.tagline}</p>
        </div>
      </div>
    </Reveal>
  );
}
