import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  CheckIcon,
  DoorOpenIcon,
  EngineIcon,
  GasPumpIcon,
  GaugeIcon,
  GearIcon,
  GearSixIcon,
  InfinityIcon,
  LightningIcon,
  MapPinIcon,
  TimerIcon,
  UserIcon,
  UsersIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { getCarById } from "../data/cars";
import type { HighlightIcon } from "../data/cars";
import { Reveal } from "../components/ui/Reveal";

/* Vervang door je eigen WhatsApp-nummer (internationaal, zonder + of spaties) */
const WHATSAPP_NUMBER = "31600000000";

const highlightIcons: Record<HighlightIcon, Icon> = {
  age: UserIcon,
  power: LightningIcon,
  doors: DoorOpenIcon,
  topspeed: GaugeIcon,
  gearbox: GearSixIcon,
  acceleration: TimerIcon,
  fuel: GasPumpIcon,
  transmission: GearIcon,
  year: CalendarBlankIcon,
  seats: UsersIcon,
  engine: EngineIcon,
  location: MapPinIcon,
};

export function CarDetailPage() {
  const { id } = useParams();
  const car = getCarById(id);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
    if (car) document.title = `${car.name} huren | Mason Rental`;
    return () => {
      document.title = "Mason Rental | Luxe Auto Verhuur";
    };
  }, [car]);

  if (!car) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-3xl font-bold text-white">Auto niet gevonden</h1>
        <p className="text-mist">Deze auto bestaat niet of is niet meer beschikbaar.</p>
        <Link
          to="/#aanbod"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-8 text-sm font-semibold text-night transition-colors hover:bg-gold-light"
        >
          Bekijk het aanbod
        </Link>
      </div>
    );
  }

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hallo Mason Rental, ik wil graag de ${car.name} reserveren.`
  )}`;

  return (
    <div className="bg-night pt-28 pb-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Link
          to="/#aanbod"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-gold"
        >
          <ArrowLeftIcon size={16} weight="bold" aria-hidden="true" />
          Terug naar aanbod
        </Link>

        {/* Galerij + reserveringszijbalk */}
        <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          <Reveal>
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              {/* Thumbnails links */}
              {car.gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1 sm:max-h-[560px] sm:w-20 sm:flex-col sm:overflow-y-auto sm:overflow-x-visible sm:pb-0">
                  {car.gallery.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      aria-label={`Toon foto ${i + 1}`}
                      aria-current={i === activeImage}
                      className={`aspect-square size-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border transition-all duration-200 sm:size-20 ${
                        i === activeImage
                          ? "border-gold opacity-100"
                          : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Hoofdfoto */}
              <div className="flex-1 overflow-hidden rounded-3xl border border-white/10 bg-charcoal">
                <motion.img
                  key={activeImage}
                  src={car.gallery[activeImage]}
                  alt={`${car.name} — foto ${activeImage + 1}`}
                  initial={{ opacity: 0.4, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
                  Mason Rental
                </p>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {car.name}
                </h1>
                <p className="mt-2 text-base text-mist">{car.tagline}</p>
              </div>

              {/* Tarieven-card */}
              <div className="rounded-3xl border border-white/10 bg-charcoal p-7 md:p-8">
                <h2 className="text-lg font-bold text-white">Tarieven</h2>
                <dl className="mt-5 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-mist">Dagprijs</dt>
                    <dd className="text-base font-semibold text-white">
                      € {car.pricePerDay},-
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-mist">Borg</dt>
                    <dd className="text-base font-semibold text-white">
                      € {car.deposit.toLocaleString("nl-NL")},-
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-mist">Kilometers</dt>
                    <dd className="text-base font-semibold text-white">Onbeperkt vrij</dd>
                  </div>
                </dl>

                <div className="mt-5 flex items-center gap-2 rounded-2xl border border-gold/25 bg-gold/10 px-4 py-3">
                  <InfinityIcon size={18} weight="bold" className="shrink-0 text-gold" aria-hidden="true" />
                  <span className="text-sm font-medium text-gold">
                    Onbeperkt aantal kilometers inbegrepen
                  </span>
                </div>
                <p className="mt-4 text-sm text-white/50">
                  Langer huren? Neem contact met ons op.
                </p>
              </div>

              {/* Reserveer-knoppen */}
              <div className="flex flex-col gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-night transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_28px_-8px_var(--color-gold)] active:scale-[0.98]"
                >
                  <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
                  Reserveer via WhatsApp
                </a>
                <Link
                  to="/#contact"
                  className="inline-flex min-h-13 cursor-pointer items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  Reserveer via formulier
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Handig om te weten */}
        <Reveal>
          <div className="mt-16 md:mt-24">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Handig om te weten</h2>
            <div className="mt-4 h-px w-14 bg-gold/60" aria-hidden="true" />
            <ul className="mt-8 grid gap-x-12 gap-y-6 sm:grid-cols-2">
              {car.highlights.map((highlight) => {
                const HlIcon = highlightIcons[highlight.icon];
                return (
                  <li key={highlight.text} className="flex items-center gap-4">
                    <HlIcon
                      size={30}
                      weight="duotone"
                      className="shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span className="text-base font-medium text-white md:text-lg">
                      {highlight.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        {/* Over deze auto + kenmerken */}
        <div className="mt-16 md:mt-24">
          <Reveal>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              De {car.name}
            </h2>
            <div className="mt-4 h-px w-14 bg-gold/60" aria-hidden="true" />
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70">
              {car.description}
            </p>

            <h3 className="mt-10 text-lg font-bold text-white">Uitgelicht</h3>
            <ul className="mt-4 grid max-w-3xl gap-3 sm:grid-cols-2">
              {car.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-sm text-white/80">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <CheckIcon size={14} weight="bold" aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
