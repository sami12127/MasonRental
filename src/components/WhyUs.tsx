import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { TargetAndTransition, Transition } from "framer-motion";
import Lottie from "lottie-react";
import {
  ArrowRightIcon,
  CarProfileIcon,
  HandTapIcon,
  HeadsetIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { Reveal } from "./ui/Reveal";

const WHATSAPP_NUMBER = "31618623757";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hallo Mason Rental, ik wil graag een auto reserveren."
)}`;

type Motion = { animate: TargetAndTransition; transition: Transition };

interface Step {
  icon?: Icon;
  /** Lottie-animatie i.p.v. een statisch icoon (bv. de euromunt) */
  lottieSrc?: string;
  title: string;
  description: string;
  motion?: Motion;
  /** Uitgelichte (gouden) card */
  highlight?: boolean;
  cta?: { label: string; href: string };
  /** Extra hoogte — hoeft niet gelijk te zijn aan de kaart ernaast */
  tall?: boolean;
}

const steps: Step[] = [
  {
    icon: HandTapIcon,
    title: "Kies jouw auto",
    description: "Kies uit ons gevarieerde aanbod jouw favoriete auto.",
    motion: {
      animate: { scale: [1, 0.88, 1] },
      transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
    },
  },
  {
    icon: HeadsetIcon,
    title: "Contact",
    description:
      "Neem contact met ons op via de verschillende contactmogelijkheden met de gewenste datum, je naam en natuurlijk de auto.",
    highlight: true,
    cta: { label: "Neem contact op", href: whatsappHref },
    motion: {
      animate: { rotate: [-8, 8, -8] },
      transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
    },
  },
  {
    lottieSrc: "/euro.json",
    title: "Ontvang je prijsopgave en proefovereenkomst",
    description:
      "Na je aanvraag krijg je binnen 1 uur de prijs en een helder overzicht van onze huurvoorwaarden.",
  },
  {
    icon: CarProfileIcon,
    title: "Auto ophalen & let's go",
    description:
      "Haal je auto op bij onze locatie in Amsterdam en geniet van elke kilometer.",
    motion: {
      animate: { x: [0, 6, 0] },
      transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
    },
    tall: true,
  },
];

export function WhyUs() {
  const reduceMotion = useReducedMotion();
  const [euroAnimation, setEuroAnimation] = useState<object | null>(null);

  useEffect(() => {
    fetch("/euro.json")
      .then((res) => res.json())
      .then(setEuroAnimation)
      .catch(() => {});
  }, []);

  const renderCard = (step: Step, i: number) => (
    <Reveal key={step.title} delay={i * 0.1}>
      <div
        className={`flex flex-col items-center rounded-3xl border p-8 text-center transition-all duration-300 hover:-translate-y-1.5 ${
          step.tall ? "sm:min-h-[19rem] sm:justify-center" : ""
        } ${
          step.highlight
            ? "border-transparent bg-gold"
            : "border-white/10 bg-charcoal hover:border-gold/40"
        }`}
      >
        {step.lottieSrc ? (
          <div className="mb-5 size-16">
            {euroAnimation && <Lottie animationData={euroAnimation} loop autoplay />}
          </div>
        ) : (
          step.icon && (
            <motion.span
              className={`mb-5 inline-flex ${step.highlight ? "text-night" : "text-gold"}`}
              style={{ transformOrigin: "center" }}
              animate={reduceMotion ? undefined : step.motion?.animate}
              transition={reduceMotion ? undefined : step.motion?.transition}
            >
              <step.icon size={56} weight="light" aria-hidden="true" />
            </motion.span>
          )
        )}

        <h3
          className={`text-sm font-bold uppercase tracking-wide ${
            step.highlight ? "text-night" : "text-white"
          }`}
        >
          {step.title}
        </h3>
        <p
          className={`mt-2.5 text-sm leading-relaxed ${
            step.highlight ? "text-night/70" : "text-mist"
          }`}
        >
          {step.description}
        </p>

        {step.cta && (
          <a
            href={step.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-night transition-colors"
          >
            {step.cta.label}
            <ArrowRightIcon
              size={14}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        )}
      </div>
    </Reveal>
  );

  return (
    <section className="bg-night py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        {/* Tekst links */}
        <Reveal>
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">
              Waarom voor ons kiezen?
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              De juiste <span className="text-gold">auto</span>, geweldige service
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-mist">
              Bij ons draait alles om eenvoud en gemak. Van het uitkiezen van jouw
              favoriete auto tot het ophalen ervan — wij zorgen voor een soepel
              proces en persoonlijke aandacht. Ontdek waarom klanten telkens weer
              voor ons kiezen.
            </p>
          </div>
        </Reveal>

        {/* Cards rechts — twee verspringende kolommen */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-5">
            {renderCard(steps[0], 0)}
            {renderCard(steps[2], 2)}
          </div>
          <div className="flex flex-col gap-5 sm:mt-16">
            {renderCard(steps[1], 1)}
            {renderCard(steps[3], 3)}
          </div>
        </div>
      </div>
    </section>
  );
}
