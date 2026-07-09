import { Link } from "react-router-dom";
import { PhoneIcon } from "@phosphor-icons/react";
import { Reveal } from "./ui/Reveal";

interface ContactCTAProps {
  /** Foto rechts in de card — per pagina anders. */
  image: string;
  imageAlt?: string;
}

export function ContactCTA({ image, imageAlt = "Mason Rental auto" }: ContactCTAProps) {
  return (
    <section className="bg-night px-6 py-16 md:py-24 lg:px-10">
      <Reveal>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-gold md:grid-cols-2">
          {/* Tekst + acties */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl font-black tracking-tight text-night md:text-4xl">
              Heb je nog vragen?
            </h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-night/70">
              Neem contact met ons op via dit nummer of bezoek onze contactpagina.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+31618623757"
                className="inline-flex min-h-13 cursor-pointer items-center justify-center gap-2 rounded-none bg-night px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-charcoal active:scale-[0.98]"
              >
                <PhoneIcon size={18} weight="fill" aria-hidden="true" />
                06 18623757
              </a>
              <Link
                to="/contact"
                className="inline-flex min-h-13 cursor-pointer items-center justify-center rounded-none border border-night/40 px-8 py-3.5 text-sm font-semibold text-night transition-all duration-300 hover:bg-night hover:text-white active:scale-[0.98]"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Foto */}
          <div className="p-4 md:py-6 md:pr-6 md:pl-0">
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="h-56 w-full rounded-2xl object-cover md:h-full md:min-h-[18rem]"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
