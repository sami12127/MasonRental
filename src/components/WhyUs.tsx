import {
  CalendarCheckIcon,
  HandshakeIcon,
  ShieldCheckIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const features = [
  {
    icon: SparkleIcon,
    title: "Premium service",
    description: "Van reservering tot inlevering: alles tot in de puntjes geregeld.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Perfect onderhouden auto's",
    description: "Elke auto wordt na iedere verhuur volledig gecontroleerd en gedetaild.",
  },
  {
    icon: CalendarCheckIcon,
    title: "Flexibel huren",
    description: "Een dag, een weekend of langer — wij denken mee met jouw planning.",
  },
  {
    icon: HandshakeIcon,
    title: "Persoonlijke service",
    description: "Direct contact met ons team, snel antwoord en heldere afspraken.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Waarom Mason Rental"
          title="Exclusiviteit zonder gedoe"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.1}>
              <div className="group h-full rounded-3xl border border-white/10 bg-night/60 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40">
                <div className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-night">
                  <feature.icon size={24} weight="duotone" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
