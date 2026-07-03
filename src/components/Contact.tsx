import {
  InstagramLogoIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

/* Vervang door je eigen WhatsApp-nummer (internationaal, zonder + of spaties) */
const WHATSAPP_NUMBER = "31618623757";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hallo Mason Rental, ik wil graag een auto reserveren."
)}`;

export function Contact() {
  return (
    <section id="contact" className="bg-night py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Contact"
          title="Reserveer jouw auto"
          description="Reserveren doe je snel en persoonlijk via WhatsApp — wij nemen dezelfde dag nog contact met je op."
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-center rounded-3xl border border-gold/25 bg-charcoal p-8 text-center md:p-12">
              <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-gold/10 text-gold">
                <WhatsappLogoIcon size={32} weight="fill" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-2xl font-bold text-white md:text-3xl">
                Direct reserveren via WhatsApp
              </h3>
              <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-mist">
                Stuur ons een bericht met de auto die je op het oog hebt en de
                gewenste datum. Wij bevestigen je reservering doorgaans binnen enkele uren.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mt-8 inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-9 py-3.5 text-sm font-semibold text-night transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_28px_-8px_var(--color-gold)] active:scale-[0.98]"
              >
                <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
                Reserveer via WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-3xl border border-white/10 bg-charcoal p-7 md:p-8">
                <h3 className="text-lg font-bold text-white">Direct contact</h3>
                <ul className="mt-5 space-y-4">
                  <li>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-11 items-center gap-3 text-sm text-white/75 transition-colors hover:text-gold"
                    >
                      <span className="inline-flex size-10 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-night">
                        <WhatsappLogoIcon size={20} weight="duotone" aria-hidden="true" />
                      </span>
                      WhatsApp: 06 18623757
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+31618623757"
                      className="group flex min-h-11 items-center gap-3 text-sm text-white/75 transition-colors hover:text-gold"
                    >
                      <span className="inline-flex size-10 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-night">
                        <PhoneIcon size={20} weight="duotone" aria-hidden="true" />
                      </span>
                      06 18623757
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/masonrental"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-11 items-center gap-3 text-sm text-white/75 transition-colors hover:text-gold"
                    >
                      <span className="inline-flex size-10 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-night">
                        <InstagramLogoIcon size={20} weight="duotone" aria-hidden="true" />
                      </span>
                      @masonrental
                    </a>
                  </li>
                  <li className="flex min-h-11 items-center gap-3 text-sm text-white/75">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                      <MapPinIcon size={20} weight="duotone" aria-hidden="true" />
                    </span>
                    Voorbeeldstraat 1, Amsterdam
                  </li>
                </ul>
              </div>

              {/* Google Maps placeholder — vervang door een echte embed */}
              <div
                className="flex min-h-52 flex-1 items-center justify-center rounded-3xl border border-white/10 bg-charcoal"
                role="img"
                aria-label="Kaart met onze locatie (placeholder)"
              >
                <div className="text-center">
                  <MapPinIcon size={32} weight="duotone" className="mx-auto text-gold" aria-hidden="true" />
                  <p className="mt-3 text-sm text-white/50">Google Maps</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
