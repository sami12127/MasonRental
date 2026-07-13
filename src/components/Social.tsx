import type { ComponentType } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import {
  InstagramIcon,
  SnapchatIcon,
  TikTokIcon,
} from "./ui/SocialBrandIcons";

interface SocialCard {
  icon: ComponentType<{ className?: string }>;
  name: string;
  description: string;
  cta: string;
  href: string;
  /** Uitgelichte (gouden) card — de middelste. */
  highlight?: boolean;
}

const cards: SocialCard[] = [
  {
    icon: InstagramIcon,
    name: "Instagram",
    description:
      "Blijf op de hoogte van onze nieuwste auto's en verhuuraanbiedingen.",
    cta: "Bekijk posts",
    href: "https://instagram.com/masonrental",
  },
  {
    icon: TikTokIcon,
    name: "TikTok",
    description: "Check onze video's voor autoverhuur tips en ideeën.",
    cta: "Bekijk video's",
    href: "https://tiktok.com/@masonrental",
    highlight: true,
  },
  {
    icon: SnapchatIcon,
    name: "Snapchat",
    description: "Ontvang exclusieve deals en updates via Snapchat.",
    cta: "Bekijk verhalen",
    href: "https://snapchat.com/add/masonrental",
  },
];

export function Social() {
  return (
    <section className="bg-night pt-8 pb-24 md:pt-12 md:pb-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Volg ons"
          title="Volg ons via"
          titleAccent="social media"
          description="Blijf op de hoogte via onze socials en ontdek de nieuwste aanbiedingen, voertuigen en updates."
        />

        <div className="grid gap-5 md:grid-cols-3 md:items-center md:gap-6">
          {cards.map((card, i) => {
            const Logo = card.icon;
            return (
              <Reveal key={card.name} delay={i * 0.1}>
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Bekijk Mason Rental op ${card.name}`}
                  className={`group flex h-full flex-col items-center rounded-3xl border p-8 text-center transition-all duration-300 hover:-translate-y-1.5 md:p-10 ${
                    card.highlight
                      ? "border-transparent bg-gold shadow-[0_18px_50px_-12px_rgba(201,163,78,0.5)] md:-my-3 md:py-14"
                      : "border-white/10 bg-charcoal hover:border-gold/40"
                  }`}
                >
                  <Logo className="mb-5 size-16 rounded-full shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-105" />

                  <h3
                    className={`text-lg font-bold tracking-wide ${
                      card.highlight ? "text-night" : "text-white"
                    }`}
                  >
                    {card.name}
                  </h3>
                  <p
                    className={`mt-2.5 text-sm leading-relaxed ${
                      card.highlight ? "text-night/70" : "text-mist"
                    }`}
                  >
                    {card.description}
                  </p>

                  <span
                    className={`mt-6 text-lg font-extrabold uppercase tracking-wide ${
                      card.highlight ? "text-night" : "text-gold"
                    }`}
                  >
                    {card.cta}
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
