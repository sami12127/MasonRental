import { Link } from "react-router-dom";
import { PhoneIcon } from "@phosphor-icons/react";
import { Reveal } from "./ui/Reveal";

interface ContactCTAProps {
  /** Foto rechts in de card — per pagina anders. */
  image: string;
  imageAlt?: string;
  /** Zet de card lager en dichter bij de footer (auto-detailpagina's). */
  tightBottom?: boolean;
}

export function ContactCTA({
  image,
  imageAlt = "Mason Rental auto",
  tightBottom = false,
}: ContactCTAProps) {
  return (
    <section
      className={`bg-night px-6 lg:px-10 ${
        tightBottom ? "pt-20 pb-8 md:pt-28 md:pb-10" : "py-8 md:py-12"
      }`}
    >
      <Reveal>
        <div className="mx-auto grid max-w-4xl overflow-hidden rounded-[2rem] bg-gold md:grid-cols-2">
          {/* Tekst + acties */}
          <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
            <h2 className="text-2xl font-black tracking-tight text-night md:text-3xl">
              Heb je nog vragen?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-night/70 md:text-base">
              Neem contact met ons op via dit nummer of bezoek onze contactpagina.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
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
              className="h-48 w-full rounded-2xl object-cover md:h-full md:min-h-[14rem]"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
