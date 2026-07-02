import { useState } from "react";
import type { FormEvent } from "react";
import {
  CheckCircleIcon,
  CircleNotchIcon,
  InstagramLogoIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { cars } from "../data/cars";

type Status = "idle" | "sending" | "sent";

const inputClass =
  "w-full min-h-12 rounded-xl border border-white/15 bg-night/60 px-4 py-3 text-sm text-white placeholder:text-white/35 transition-colors duration-200 focus:border-gold focus:outline-none";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    /* Koppel hier je eigen backend of e-maildienst (bijv. Formspree/Resend) */
    setTimeout(() => setStatus("sent"), 1200);
  }

  return (
    <section id="contact" className="bg-night py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Contact"
          title="Reserveer jouw auto"
          description="Vul het formulier in en wij nemen dezelfde dag nog contact met je op."
        />

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-charcoal p-7 md:p-10"
              aria-label="Reserveringsformulier"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/80">
                    Naam <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jouw naam"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white/80">
                    Telefoon <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="06 12345678"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/80">
                    E-mail <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="naam@voorbeeld.nl"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="car" className="mb-2 block text-sm font-medium text-white/80">
                    Gewenste auto
                  </label>
                  <select id="car" name="car" className={`${inputClass} cursor-pointer`}>
                    {cars.map((car) => (
                      <option key={car.id} value={car.id} className="bg-charcoal">
                        {car.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/80">
                    Bericht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Gewenste datum, duur en eventuele vragen"
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </div>

              <p className="mt-4 text-xs text-white/40">
                Velden met <span className="text-gold">*</span> zijn verplicht.
              </p>

              <button
                type="submit"
                disabled={status !== "idle"}
                className="mt-6 inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-8 text-sm font-semibold text-night transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_28px_-8px_var(--color-gold)] active:scale-[0.98] disabled:cursor-default disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" && (
                  <CircleNotchIcon size={16} className="animate-spin" aria-hidden="true" />
                )}
                {status === "sent" ? "Verzonden" : status === "sending" ? "Versturen..." : "Verstuur aanvraag"}
              </button>

              {status === "sent" && (
                <p role="status" className="mt-4 flex items-center gap-2 text-sm text-gold">
                  <CheckCircleIcon size={16} weight="fill" aria-hidden="true" />
                  Bedankt! Wij nemen zo snel mogelijk contact met je op.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-3xl border border-white/10 bg-charcoal p-7 md:p-8">
                <h3 className="text-lg font-bold text-white">Direct contact</h3>
                <ul className="mt-5 space-y-4">
                  <li>
                    <a
                      href="https://wa.me/31618623757"
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
