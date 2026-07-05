import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import type { TargetAndTransition, Transition } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowsOutIcon,
  BankIcon,
  CalendarBlankIcon,
  CheckIcon,
  DeviceMobileIcon,
  DoorOpenIcon,
  EngineIcon,
  GasPumpIcon,
  GaugeIcon,
  GearIcon,
  GearSixIcon,
  InfinityIcon,
  LightningIcon,
  MapPinIcon,
  MoneyIcon,
  ShieldCheckIcon,
  TimerIcon,
  UserIcon,
  UsersIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { getCarById } from "../data/cars";
import type { HighlightIcon } from "../data/cars";
import { Reveal } from "../components/ui/Reveal";
import { ContactCTA } from "../components/ContactCTA";

/* Vervang door je eigen WhatsApp-nummer (internationaal, zonder + of spaties) */
const WHATSAPP_NUMBER = "31618623757";

/* Betaalmogelijkheden — geldt voor alle auto's */
const paymentMethods = [
  { icon: MoneyIcon, label: "Contant betalen" },
  { icon: BankIcon, label: "Veilig via bankoverschrijving" },
  { icon: DeviceMobileIcon, label: "Tikkie" },
];

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

/* Continue, subtiele animatie per icoontype — passend bij wat het icoon voorstelt */
const iconMotions: Record<
  HighlightIcon,
  { animate: TargetAndTransition; transition: Transition }
> = {
  power: {
    animate: { scale: [1, 1.18, 1], opacity: [1, 0.65, 1] },
    transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
  },
  gearbox: {
    animate: { rotate: 360 },
    transition: { duration: 6, repeat: Infinity, ease: "linear" },
  },
  transmission: {
    animate: { rotate: 360 },
    transition: { duration: 7, repeat: Infinity, ease: "linear" },
  },
  topspeed: {
    animate: { rotate: [-10, 10, -10] },
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  },
  acceleration: {
    animate: { scale: [1, 1.12, 1] },
    transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
  },
  engine: {
    animate: { rotate: [-2.5, 2.5, -2.5] },
    transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
  },
  fuel: {
    animate: { y: [0, -3, 0] },
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  },
  age: {
    animate: { y: [0, -4, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  doors: {
    animate: { y: [0, -4, 0] },
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
  },
  year: {
    animate: { y: [0, -4, 0] },
    transition: { duration: 3.4, repeat: Infinity, ease: "easeInOut" },
  },
  seats: {
    animate: { y: [0, -4, 0] },
    transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
  },
  location: {
    animate: { y: [0, -4, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export function CarDetailPage() {
  const { id } = useParams();
  const car = getCarById(id);
  const [activeImage, setActiveImage] = useState(0);
  const reduceMotion = useReducedMotion();

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
    <div className="bg-night pt-[7.5rem] pb-24 md:pt-[8.5rem]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Link
          to="/#aanbod"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-gold"
        >
          <ArrowLeftIcon size={16} weight="bold" aria-hidden="true" />
          Terug naar aanbod
        </Link>

        {/* Galerij + reserveringszijbalk */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-12">
          <Reveal>
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              {/* Thumbnails links. Op desktop scrollt de lijst absoluut binnen
                 een wrapper, zodat de hoofdfoto de hoogte bepaalt (geen restrook). */}
              {car.gallery.length > 1 && (
                <div className="sm:relative sm:w-24 sm:shrink-0">
                  <div className="thumb-scroll flex gap-3 overflow-x-auto sm:absolute sm:inset-0 sm:flex-col sm:overflow-x-visible sm:overflow-y-auto sm:pr-4">
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
                </div>
              )}

              {/* Hoofdfoto met naam onderin */}
              <div className="relative flex-1 overflow-hidden rounded-3xl border border-white/10 bg-charcoal">
                <motion.img
                  key={activeImage}
                  src={car.gallery[activeImage]}
                  alt={`${car.name} — foto ${activeImage + 1}`}
                  initial={{ opacity: 0.4, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="aspect-[4/3] w-full object-cover"
                />

                <a
                  href={car.gallery[activeImage]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Foto op volledig formaat bekijken"
                  className="absolute left-4 top-4 inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-night/50 text-white backdrop-blur-md transition-colors duration-200 hover:border-gold hover:text-gold"
                >
                  <ArrowsOutIcon size={18} weight="bold" aria-hidden="true" />
                </a>

                {/* Gouden gloed die onderin de foto begint */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gold/45 via-night/70 to-transparent"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-night via-night/50 to-transparent px-6 pb-6 pt-16 md:px-8 md:pb-8"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-8 md:pb-8">
                  <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
                    {car.name}
                  </h1>
                  <p className="mt-1.5 text-sm text-white/80 md:text-base">
                    {car.tagline}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Handig om te weten */}
          <Reveal>
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">Handig om te weten</h2>
              <div className="mt-4 h-px w-14 bg-gold/60" aria-hidden="true" />
              <ul className="mt-8 grid gap-x-16 gap-y-3 sm:grid-cols-2">
                {car.highlights.map((highlight) => {
                  const HlIcon = highlightIcons[highlight.icon];
                  const iconMotion = iconMotions[highlight.icon];
                  return (
                    <li key={highlight.text} className="flex items-center gap-4">
                      <motion.span
                        className="inline-flex shrink-0 text-gold"
                        style={{ transformOrigin: "center" }}
                        animate={reduceMotion ? undefined : iconMotion.animate}
                        transition={reduceMotion ? undefined : iconMotion.transition}
                      >
                        <HlIcon size={30} weight="duotone" aria-hidden="true" />
                      </motion.span>
                      <span className="text-base font-medium text-white md:text-lg">
                        {highlight.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6 lg:sticky lg:top-36 lg:self-start">
              {/* Tarieven-card */}
              <div className="rounded-2xl border border-gold/25 bg-charcoal p-5">
                <h2 className="text-xl font-bold text-gold">Tarieven</h2>
                <dl className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-base font-semibold text-white">
                      <CalendarBlankIcon size={20} className="text-gold" aria-hidden="true" />
                      Dagprijs
                    </dt>
                    <dd className="text-base font-bold text-white">
                      € {car.pricePerDay},-
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-base font-semibold text-white">
                      <ShieldCheckIcon size={20} className="text-gold" aria-hidden="true" />
                      Borg
                    </dt>
                    <dd className="text-base font-bold text-white">
                      € {car.deposit.toLocaleString("nl-NL")},-
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-base font-semibold text-white">
                      <InfinityIcon size={20} className="text-gold" aria-hidden="true" />
                      Kilometers
                    </dt>
                    <dd className="text-base font-bold text-white">Onbeperkt vrij</dd>
                  </div>
                </dl>

                <p className="mt-4 text-sm text-white/50">
                  Langer huren? Neem contact met ons op.
                </p>
              </div>

              {/* Betaalmogelijkheden-card */}
              <div className="rounded-2xl border border-gold/25 bg-charcoal p-5">
                <h2 className="text-xl font-bold text-gold">Betaalmogelijkheden</h2>
                <ul className="mt-4 space-y-3">
                  {paymentMethods.map((method) => (
                    <li
                      key={method.label}
                      className="flex items-center gap-2 text-base font-semibold text-white"
                    >
                      <method.icon size={20} className="shrink-0 text-gold" aria-hidden="true" />
                      {method.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reserveer-knop */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-night transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_28px_-8px_var(--color-gold)] active:scale-[0.98]"
              >
                <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
                Reserveer via WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

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

      <ContactCTA image={car.image} imageAlt={car.name} />
    </div>
  );
}
