import { Link } from "react-router-dom";
import { InstagramLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";

const nav = [
  { label: "Home", to: "/#home" },
  { label: "Aanbod", to: "/#aanbod" },
  { label: "Over ons", to: "/#over-ons" },
  { label: "FAQ", to: "/#faq" },
  { label: "Contact", to: "/#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-night">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <Link to="/#home" className="text-xl font-bold tracking-tight text-white">
              MASON<span className="text-gold"> RENTAL</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/45">
              Exclusieve autoverhuur voor wie alleen genoegen neemt met het beste.
            </p>
          </div>

          <nav aria-label="Footer navigatie">
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3">
              {nav.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-3">
            <a
              href="https://wa.me/31600000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              <WhatsappLogoIcon size={20} weight="duotone" />
            </a>
            <a
              href="https://instagram.com/masonrental"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              <InstagramLogoIcon size={20} weight="duotone" />
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-7 text-center">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Mason Rental. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
