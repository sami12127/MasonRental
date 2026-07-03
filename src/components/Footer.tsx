import { Link } from "react-router-dom";
import {
  ArrowUpRightIcon,
  InstagramLogoIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";

const WHATSAPP_NUMBER = "31618623757";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hallo Mason Rental, ik wil graag een auto reserveren."
)}`;

const nav = [
  { label: "Home", to: "/#home" },
  { label: "Aanbod", to: "/#aanbod" },
  { label: "Over ons", to: "/#over-ons" },
  { label: "FAQ", to: "/#faq" },
  { label: "Contact", to: "/#contact" },
];

const contact = [
  { id: "whatsapp", icon: WhatsappLogoIcon, label: "06 18623757", href: whatsappHref, external: true },
  { id: "phone", icon: PhoneIcon, label: "06 18623757", href: "tel:+31618623757", external: false },
  { id: "location", icon: MapPinIcon, label: "Amsterdam", href: undefined, external: false },
];

const socials = [
  { icon: WhatsappLogoIcon, label: "WhatsApp", href: whatsappHref },
  { icon: InstagramLogoIcon, label: "Instagram", href: "https://instagram.com/masonrental" },
];

export function Footer() {
  return (
    <footer className="bg-night px-6 pb-10 lg:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-charcoal">
        {/* Gouden gloed bovenaan */}
        <div
          className="pointer-events-none absolute -top-28 left-1/2 h-56 w-[38rem] max-w-full -translate-x-1/2 rounded-full bg-gold/15 blur-3xl"
          aria-hidden="true"
        />

        {/* CTA-band */}
        <div className="relative flex flex-col items-center gap-6 border-b border-white/10 px-6 py-11 text-center md:flex-row md:justify-between md:px-12 md:text-left lg:px-14">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Klaar voor jouw <span className="text-gold">droomauto</span>?
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/50">
              Reserveren doe je snel en persoonlijk via WhatsApp — wij regelen de rest.
            </p>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-13 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-night transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_28px_-8px_var(--color-gold)] active:scale-[0.98]"
          >
            <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
            Reserveer via WhatsApp
          </a>
        </div>

        {/* Kolommen */}
        <div className="relative grid gap-10 px-6 py-12 md:grid-cols-[1.6fr_1fr_1fr] md:px-12 lg:px-14">
          {/* Merk */}
          <div className="text-center md:text-left">
            <Link to="/#home" aria-label="Mason Rental — naar home" className="inline-block">
              <img
                src="/logo1.png"
                alt="Mason Rental"
                width={1368}
                height={287}
                className="h-14 w-auto sm:h-16"
              />
            </Link>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-white/45 md:mx-0">
              Exclusieve autoverhuur voor wie alleen genoegen neemt met het beste.
            </p>
            <div className="mt-6 flex justify-center gap-3 md:justify-start">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-night hover:shadow-[0_0_22px_-6px_var(--color-gold)]"
                >
                  <social.icon size={20} weight="fill" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigatie */}
          <nav aria-label="Footer navigatie" className="text-center md:text-left">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Navigatie
            </h3>
            <ul className="mt-5 space-y-3">
              {nav.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors duration-200 hover:text-gold"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Contact
            </h3>
            <ul className="mt-5 space-y-4">
              {contact.map((item) => {
                const content = (
                  <>
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-night">
                      <item.icon size={17} weight="duotone" aria-hidden="true" />
                    </span>
                    {item.label}
                  </>
                );
                return (
                  <li key={item.id} className="flex justify-center md:justify-start">
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex items-center gap-3 text-sm text-white/60 transition-colors duration-200 hover:text-gold"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="group flex items-center gap-3 text-sm text-white/60">
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Onderbalk */}
        <div className="relative flex flex-col items-center justify-between gap-3 border-t border-white/10 px-6 py-6 text-center md:flex-row md:px-12 md:text-left lg:px-14">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Mason Rental. Alle rechten voorbehouden.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-xs font-medium text-white/45 transition-colors duration-200 hover:text-gold"
          >
            Direct reserveren
            <ArrowUpRightIcon
              size={13}
              weight="bold"
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
