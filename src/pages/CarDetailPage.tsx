import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  CarProfileIcon,
  CheckIcon,
  DoorOpenIcon,
  EngineIcon,
  GaugeIcon,
  GearSixIcon,
  TireIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { getCarById } from "../data/cars";
import type { CarSpec } from "../data/cars";
import { Reveal } from "../components/ui/Reveal";

/* Vervang door je eigen WhatsApp-nummer (internationaal, zonder + of spaties) */
const WHATSAPP_NUMBER = "31600000000";

const specIcons: Record<CarSpec["icon"], Icon> = {
  power: GaugeIcon,
  engine: EngineIcon,
  drivetrain: TireIcon,
  gearbox: GearSixIcon,
  doors: DoorOpenIcon,
  body: CarProfileIcon,
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

        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          {/* Galerij */}
          <Reveal>
            <div>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-charcoal">
                <motion.img
                  key={activeImage}
                  src={car.gallery[activeImage]}
                  alt={`${car.name} — foto ${activeImage + 1}`}
                  initial={{ opacity: 0.4, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>

              {car.gallery.length > 1 && (
                <div className="mt-4 grid grid-cols-5 gap-3 sm:grid-cols-6">
                  {car.gallery.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      aria-label={`Toon foto ${i + 1}`}
                      aria-current={i === activeImage}
                      className={`aspect-square cursor-pointer overflow-hidden rounded-xl border transition-all duration-200 ${
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
            </div>
          </Reveal>

          {/* Info + reservering */}
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
                Mason Rental
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
                {car.name}
              </h1>
              <p className="mt-2 text-base text-mist">{car.tagline}</p>

              <div className="mt-6 flex items-end gap-2 border-y border-white/10 py-5">
                <span className="text-4xl font-bold text-white">€{car.pricePerDay}</span>
                <span className="mb-1 text-sm text-mist">per dag</span>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2.5">
                {car.specs.map((spec) => {
                  const SpecIcon = specIcons[spec.icon];
                  return (
                    <li
                      key={spec.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-graphite px-3.5 py-1.5 text-xs font-medium text-white/80"
                    >
                      <SpecIcon
                        size={15}
                        weight="duotone"
                        className="text-gold"
                        aria-hidden="true"
                      />
                      {spec.label}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
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

        {/* Beschrijving + specificaties + kenmerken */}
        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal>
            <div>
              <h2 className="text-2xl font-bold text-white">Over deze auto</h2>
              <div className="mt-4 h-px w-14 bg-gold/60" aria-hidden="true" />
              <p className="mt-6 text-base leading-relaxed text-white/70">
                {car.description}
              </p>

              <h3 className="mt-10 text-lg font-bold text-white">Uitgelicht</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {car.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-white/80">
                    <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <CheckIcon size={14} weight="bold" aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-charcoal p-7 md:p-8">
              <h2 className="text-lg font-bold text-white">Specificaties</h2>
              <dl className="mt-5 divide-y divide-white/5">
                {car.details.map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-3.5">
                    <dt className="text-sm text-mist">{row.label}</dt>
                    <dd className="text-sm font-semibold text-white">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
