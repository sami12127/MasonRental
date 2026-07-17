import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowsOutIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { getCarById } from "../data/cars";
import type { HighlightIcon } from "../data/cars";
import { Reveal } from "../components/ui/Reveal";
import { LottieIcon } from "../components/ui/LottieIcon";
import { FAQ } from "../components/FAQ";
import { ContactCTA } from "../components/ContactCTA";

/* Vervang door je eigen WhatsApp-nummer (internationaal, zonder + of spaties) */
const WHATSAPP_NUMBER = "31618623757";

/* Betaalmogelijkheden — geldt voor alle auto's */
const paymentMethods = [
  { lottie: "/lottie_animations/money.json", label: "Contant betalen" },
  { lottie: "/lottie_animations/bankoverschrijving.json", label: "Veilig via bankoverschrijving" },
  { lottie: "/lottie_animations/tikkie.json", label: "Tikkie" },
];

/* Lottie-animatie per highlight-type — vervangt de statische icoontjes */
const highlightLotties: Record<HighlightIcon, string> = {
  age: "/lottie_animations/driver.json",
  power: "/lottie_animations/horsepower.json",
  doors: "/lottie_animations/door.json",
  topspeed: "/lottie_animations/speedometer.json",
  gearbox: "/lottie_animations/tandwiel.json",
  acceleration: "/lottie_animations/stopwatch.json",
  fuel: "/lottie_animations/fuel.json",
  transmission: "/lottie_animations/schakelen.json",
  year: "/lottie_animations/agenda.json",
  seats: "/lottie_animations/gordel.json",
  engine: "/lottie_animations/engine.json",
  location: "/lottie_animations/location.json",
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
          className="btn-sweep [--sweep:var(--color-night)] inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-none bg-gold px-8 text-sm font-semibold text-night transition-all duration-300 hover:text-gold active:scale-[0.98]"
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
    <div className="bg-night pt-[6rem] md:pt-[7rem]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Link
          to="/#aanbod"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-gold"
        >
          <ArrowLeftIcon size={16} weight="bold" aria-hidden="true" />
          Terug naar aanbod
        </Link>

        {/* Galerij + reserveringszijbalk */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-12">
          <div className="flex min-w-0 flex-col gap-12">
          <Reveal>
            <div className="flex min-w-0 flex-col-reverse gap-3 sm:flex-row">
              {/* Thumbnails links. Op desktop scrollt de lijst absoluut binnen
                 een wrapper, zodat de hoofdfoto de hoogte bepaalt (geen restrook). */}
              {car.gallery.length > 1 && (
                <div className="min-w-0 sm:relative sm:w-24 sm:shrink-0">
                  <div className="thumb-scroll flex gap-3 overflow-x-auto sm:absolute sm:inset-0 sm:flex-col sm:overflow-x-hidden sm:overflow-y-auto sm:pr-4">
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

              {/* Hoofdfoto. Naam + tagline: mobiel boven de card, desktop
                 als overlay onderin de foto. */}
              <div className="relative flex min-w-0 flex-1 flex-col">
                {/* Naam + tagline */}
                <div className="order-first mb-4 sm:order-none sm:absolute sm:inset-x-0 sm:bottom-0 sm:z-10 sm:mb-0 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
                  <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
                    {car.name}
                  </h1>
                  <p className="mt-1.5 text-sm text-white/80 md:text-base">
                    {car.tagline}
                  </p>
                </div>

                {/* Foto-card */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-charcoal">
                  <motion.img
                    key={activeImage}
                    src={car.gallery[activeImage]}
                    alt={`${car.name} — foto ${activeImage + 1}`}
                    initial={{ opacity: 0.4, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="aspect-[16/10] w-full object-cover"
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

                  {/* Gouden gloed + donkere gradient achter de overlay-tekst —
                     alleen op desktop, want daar staat de naam over de foto. */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-gold/15 via-night/25 to-transparent sm:block"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-night via-night/50 to-transparent px-6 pb-6 pt-16 sm:block md:px-8 md:pb-8"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Handig om te weten — verschijnt direct, zonder scroll-animatie */}
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">Handig om te weten</h2>
            <div className="mt-4 h-px w-14 bg-gold/60" aria-hidden="true" />
            <ul className="mt-8 grid gap-x-16 gap-y-3 sm:grid-cols-2">
              {car.highlights.map((highlight) => (
                <li key={highlight.text} className="flex items-center gap-4">
                  <LottieIcon
                    src={highlightLotties[highlight.icon]}
                    className="inline-flex size-9 shrink-0"
                  />
                  <span className="text-base font-medium text-white md:text-lg">
                    {highlight.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Over deze auto + kenmerken */}
          <Reveal>
            <div>
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
                    <LottieIcon
                      src="/lottie_animations/vinlje.json"
                      className="inline-flex size-7 shrink-0"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              {/* Tarieven-card */}
              <div className="rounded-2xl border border-gold/25 bg-charcoal p-5">
                <h2 className="text-xl font-bold text-gold">Tarieven</h2>
                <dl className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-base font-semibold text-white">
                      <LottieIcon src="/lottie_animations/kalender.json" className="inline-flex size-6 shrink-0" />
                      Dagprijs
                    </dt>
                    <dd className="text-base font-bold text-white">
                      € {car.pricePerDay},-
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-base font-semibold text-white">
                      <LottieIcon src="/lottie_animations/borg.json" className="inline-flex size-6 shrink-0" />
                      Borg
                    </dt>
                    <dd className="text-base font-bold text-white">
                      € {car.deposit.toLocaleString("nl-NL")},-
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2 text-base font-semibold text-white">
                      <LottieIcon src="/lottie_animations/infinty.json" className="inline-flex size-6 shrink-0" />
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
                      <LottieIcon src={method.lottie} className="inline-flex size-6 shrink-0" />
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
                className="btn-sweep [--sweep:var(--color-night)] inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-none bg-gold px-8 py-3.5 text-sm font-semibold text-night transition-all duration-300 hover:text-gold active:scale-[0.98]"
              >
                <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
                Reserveer via WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="pt-10 md:pt-16">
        <FAQ />
      </div>

      <ContactCTA image={car.ctaImage ?? car.image} imageAlt={car.name} tightBottom />
    </div>
  );
}
