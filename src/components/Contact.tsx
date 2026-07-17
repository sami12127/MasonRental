import { WhatsappLogoIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { LottieIcon } from "./ui/LottieIcon";

/* Vervang door je eigen WhatsApp-nummer (internationaal, zonder + of spaties) */
const WHATSAPP_NUMBER = "31618623757";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hallo Mason Rental, ik wil graag een auto reserveren."
)}`;

const EMAIL = "info@masonrental.nl";
const ADDRESS = "Vrijheidsdans 6, Capelle aan den IJssel";
const mapsQuery = encodeURIComponent(ADDRESS);
const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

interface ContactRow {
  /** Kleine bovenlabel */
  label: string;
  /** Zichtbare waarde */
  value: string;
  href?: string;
  external?: boolean;
  /** Lottie-animatie als icoon (goud) */
  lottieSrc?: string;
  /** Phosphor-icoon (voor merklogo's) */
  icon?: ReactNode;
}

const rows: ContactRow[] = [
  {
    label: "WhatsApp",
    value: "06 18623757",
    href: whatsappHref,
    external: true,
    lottieSrc: "/lottie_animations/whatsapp.json",
  },
  {
    label: "Bellen",
    value: "06 18623757",
    href: "tel:+31618623757",
    lottieSrc: "/lottie_animations/bellen.json",
  },
  {
    label: "E-mail",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    lottieSrc: "/lottie_animations/mail.json",
  },
  {
    label: "Locatie",
    value: ADDRESS,
    href: mapsHref,
    external: true,
    lottieSrc: "/lottie_animations/location.json",
  },
];

function ContactIcon({ row }: { row: ContactRow }) {
  return (
    <span className="inline-flex size-9 shrink-0 items-center justify-center text-gold">
      {row.lottieSrc ? (
        <LottieIcon src={row.lottieSrc} className="size-9" />
      ) : (
        row.icon
      )}
    </span>
  );
}

export function Contact() {
  return (
    <section id="contact" className="bg-night pt-8 pb-8 md:pt-12 md:pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Contact"
          title="Reserveer jouw"
          titleAccent="auto"
          description="Reserveren doe je snel en persoonlijk via WhatsApp — wij nemen dezelfde dag nog contact met je op."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.65fr]">
          {/* Linkerkolom — compacte WhatsApp-card + contactgegevens */}
          <Reveal>
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-3xl border border-white/10 bg-charcoal p-6 md:p-7">
                <h3 className="text-lg font-bold text-white">Direct contact</h3>
                <ul className="mt-4 space-y-1">
                  {rows.map((row) => {
                    const content = (
                      <>
                        <ContactIcon row={row} />
                        <span className="flex min-w-0 flex-col">
                          <span className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-gold/70">
                            {row.label}
                          </span>
                          <span className="truncate text-sm font-medium text-white/85 transition-colors group-hover:text-gold">
                            {row.value}
                          </span>
                        </span>
                      </>
                    );

                    return (
                      <li key={row.label}>
                        {row.href ? (
                          <a
                            href={row.href}
                            {...(row.external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="group flex items-center gap-3.5 rounded-2xl p-2.5 transition-colors duration-300 hover:bg-white/[0.04]"
                          >
                            {content}
                          </a>
                        ) : (
                          <div className="group flex items-center gap-3.5 p-2.5">
                            {content}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-3xl border border-gold/25 bg-charcoal p-6">
                <h3 className="text-base font-bold text-white">
                  Direct reserveren via WhatsApp
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  Stuur de gewenste auto en datum — wij bevestigen doorgaans
                  binnen enkele uren.
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 btn-sweep [--sweep:var(--color-night)] inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-none bg-gold px-6 py-3 text-sm font-semibold text-night transition-all duration-300 hover:text-gold active:scale-[0.98]"
                >
                  <WhatsappLogoIcon size={18} weight="fill" aria-hidden="true" />
                  Reserveer via WhatsApp
                </a>
              </div>
            </div>
          </Reveal>

          {/* Rechterkolom — grote Google Maps-embed */}
          <Reveal delay={0.15}>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full min-h-[24rem] overflow-hidden rounded-3xl border border-white/10 transition-colors duration-300 hover:border-gold/40 lg:min-h-[32rem]"
              aria-label={`Bekijk ${ADDRESS} op Google Maps`}
            >
              <iframe
                title="Locatie van Mason Rental op de kaart"
                src={mapsEmbed}
                className="h-full w-full"
                style={{
                  border: 0,
                  filter:
                    "invert(0.92) hue-rotate(180deg) saturate(0.7) brightness(0.9) contrast(0.9)",
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Adres-overlay onderin */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2.5 bg-gradient-to-t from-night via-night/80 to-transparent px-6 pb-5 pt-12">
                <LottieIcon
                  src="/lottie_animations/location.json"
                  className="size-8 shrink-0"
                />
                <span className="text-base font-semibold text-white">
                  {ADDRESS}
                </span>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
