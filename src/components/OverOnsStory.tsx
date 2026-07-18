import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal } from "./ui/Reveal";
import { LottieIcon } from "./ui/LottieIcon";

const WHATSAPP_NUMBER = "31618623757";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hallo Mason Rental, ik heb een vraag."
)}`;
const reserveerHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hallo Mason Rental, ik wil graag een auto reserveren."
)}`;
const reviewsHref =
  "https://www.google.com/maps/search/?api=1&query=Mason+Rental+Capelle+aan+den+IJssel";

/* ---------- Wisselende foto/tekst-blokken ---------- */

interface StoryBlock {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  text: string;
  /** Foto rechts i.p.v. links (op desktop). */
  reverse?: boolean;
  /** Laadt de foto direct (boven de fold) i.p.v. lazy. */
  priority?: boolean;
  /** Meerdere foto's → auto-roterende slideshow i.p.v. één foto. */
  images?: string[];
}

const blocks: StoryBlock[] = [
  {
    image: "/over-ons.webp",
    imageAlt: "Mason Rental",
    eyebrow: "Ons verhaal",
    title: "Ontstaan uit pure passie voor auto's",
    text: "Mason Rental begon vanuit een oprechte liefde voor bijzondere auto's en is uitgegroeid tot dé plek in Capelle aan den IJssel om high-performance auto's te huren. Elk voertuig kiezen we met zorg en houden we in topconditie, zodat jij zonder omkijken kunt genieten van elke kilometer.",
    priority: true,
  },
  {
    image: "/cars/rs3-37-wide.webp",
    images: [
      "/cars/rs3-37-wide.webp",
      "/cars/rs3-17.webp",
      "/cars/rs3-27.webp",
      "/cars/rs3-6572-wide.webp",
    ],
    imageAlt: "Audi RS3",
    eyebrow: "Onze aanpak",
    title: "Persoonlijk en zonder gedoe",
    text: "Bij ons geen ingewikkelde formulieren of verborgen kosten. We denken met je mee, regelen alles snel en houden de communicatie kort en helder. Zo voelt huren bij Mason Rental net zo bijzonder als de auto waar je in stapt.",
    reverse: true,
  },
];

/** Auto-roterende slideshow met crossfade, navigatiebolletjes en swipe. */
function Slideshow({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);

  const go = (i: number) =>
    setIndex(((i % images.length) + images.length) % images.length);

  // Auto-advance; herstart de timer na elke wissel (ook na swipe/klik).
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setTimeout(() => go(index + 1), 4500);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  return (
    <div
      className="relative h-64 w-full touch-pan-y select-none sm:h-80 md:h-[26rem]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i === 0 ? undefined : true}
          loading={i === 0 ? "eager" : "lazy"}
          draggable={false}
          className={`absolute inset-0 h-full w-full object-cover ${
            reduceMotion ? "" : "transition-opacity duration-1000 ease-in-out"
          } ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* Scrim voor leesbaarheid van de bolletjes */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-night/50 to-transparent"
        aria-hidden="true"
      />

      {/* Navigatiebolletjes */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Ga naar foto ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-gold" : "w-2 bg-white/60 hover:bg-white/90"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function StoryRow({ block }: { block: StoryBlock }) {
  return (
    <Reveal>
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        <div className={block.reverse ? "md:order-2" : ""}>
          <div className="overflow-hidden rounded-3xl border border-white/10">
            {block.images ? (
              <Slideshow images={block.images} alt={block.imageAlt} />
            ) : (
              <img
                src={block.image}
                alt={block.imageAlt}
                loading={block.priority ? "eager" : "lazy"}
                className="h-64 w-full object-cover sm:h-80 md:h-[26rem]"
              />
            )}
          </div>
        </div>
        <div className={block.reverse ? "md:order-1" : ""}>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            {block.eyebrow}
          </p>
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            {block.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-mist">
            {block.text}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------- 6 grote feature-cards ---------- */

interface FeatureCard {
  lottieSrc: string;
  title: string;
  description: string;
  cta: { label: string; to?: string; href?: string };
  highlight?: boolean;
}

const features: FeatureCard[] = [
  {
    lottieSrc: "/lottie_animations/diamond_exclusive.json",
    title: "Exclusieve selectie",
    description:
      "Geen eindeloze lijst, maar een zorgvuldig samengestelde selectie bijzondere auto's — elk uitgekozen omdat 'ie écht bijzonder is om te rijden.",
    cta: { label: "Bekijk onze auto's", to: "/aanbod" },
  },
  {
    lottieSrc: "/lottie_animations/sleutel_overhandigen.json",
    title: "Snel & eenvoudig",
    description:
      "Reserveren doe je in een paar simpele stappen: kies je auto, doe je aanvraag en rijd zorgeloos weg.",
    cta: { label: "Start je reservering", href: reserveerHref },
  },
  {
    lottieSrc: "/lottie_animations/betrouwbaarheid.json",
    title: "Betrouwbaar",
    description:
      "Onze auto's verkeren altijd in topconditie en worden zorgvuldig onderhouden. Rijd met een gerust hart.",
    cta: { label: "Google reviews", href: reviewsHref },
    highlight: true,
  },
  {
    lottieSrc: "/lottie_animations/contact.json",
    title: "Altijd bereikbaar",
    description:
      "Vragen of hulp nodig? Ons team is snel en persoonlijk bereikbaar via WhatsApp, telefoon en social media.",
    cta: { label: "Neem contact op", to: "/contact" },
  },
  {
    lottieSrc: "/lottie_animations/korting.json",
    title: "Spot prijzen",
    description:
      "Premium rijden hoeft niet duur te zijn. Wij bieden eerlijke, concurrerende tarieven zonder verrassingen.",
    cta: { label: "Bekijk prijzen", to: "/aanbod" },
    highlight: true,
  },
  {
    lottieSrc: "/lottie_animations/gemakkelijk.json",
    title: "Eenvoudig betalen",
    description:
      "Betaal veilig en gemakkelijk met verschillende betaalmethodes, zodat jij zorgeloos de weg op gaat.",
    cta: { label: "Stel je vraag", href: whatsappHref },
  },
];

function FeatureCardItem({ card, index }: { card: FeatureCard; index: number }) {
  const ctaClass = `mt-4 self-center text-lg font-extrabold uppercase tracking-wide ${
    card.highlight ? "text-night" : "text-gold"
  }`;

  return (
    <Reveal delay={(index % 3) * 0.1}>
      <div
        className={`flex h-full min-h-[19rem] flex-col rounded-2xl border p-10 text-center transition-colors duration-300 md:min-h-[22rem] md:p-12 ${
          card.highlight
            ? "border-transparent bg-gold"
            : "border-white/10 bg-charcoal hover:border-gold/40"
        }`}
      >
        <LottieIcon src={card.lottieSrc} className="mb-2 size-20 self-center" />
        <h3
          className={`mt-2 text-xl font-bold tracking-wide ${
            card.highlight ? "text-night" : "text-gold"
          }`}
        >
          {card.title}
        </h3>
        <p
          className={`mt-3 flex-1 text-base leading-relaxed ${
            card.highlight ? "text-night/70" : "text-mist"
          }`}
        >
          {card.description}
        </p>

        {card.cta.to ? (
          <Link to={card.cta.to} className={ctaClass}>
            {card.cta.label}
          </Link>
        ) : (
          <a
            href={card.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClass}
          >
            {card.cta.label}
          </a>
        )}
      </div>
    </Reveal>
  );
}

/* ---------- Sectie ---------- */

export function OverOnsStory() {
  return (
    <section className="bg-night pt-12 pb-4 md:pt-16 md:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Twee wisselende foto/tekst-blokken */}
        <div className="space-y-24 md:space-y-36">
          {blocks.map((block) => (
            <StoryRow key={block.title} block={block} />
          ))}
        </div>

        {/* Service met Zorg — gecentreerd tekstblok */}
        <Reveal>
          <div className="mx-auto mt-32 max-w-2xl text-center md:mt-44">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Service met zorg
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Wij werken aan <span className="text-gold">jouw comfort</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-white/70">
              Bij Mason Rental draait alles om comfort en gemak. Ons team zorgt
              ervoor dat je huurervaring van begin tot eind soepel verloopt — of
              het nu gaat om het kiezen van de juiste auto of persoonlijke
              ondersteuning onderweg. Wat je ook nodig hebt, wij staan voor je
              klaar.
            </p>
          </div>
        </Reveal>

        {/* 6 grote feature-cards */}
        <div className="mt-14 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
          {features.map((card, i) => (
            <FeatureCardItem key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
