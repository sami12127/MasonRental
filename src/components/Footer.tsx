import { Link } from "react-router-dom";
import {
  InstagramLogoIcon,
  MapPinIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";

const WHATSAPP_NUMBER = "31618623757";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hallo Mason Rental, ik wil graag een auto reserveren."
)}`;

const socials = [
  { icon: WhatsappLogoIcon, label: "WhatsApp", href: whatsappHref },
  { icon: InstagramLogoIcon, label: "Instagram", href: "https://instagram.com/masonrental" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night">
      {/* Groot logo over de volledige breedte */}
      <div className="relative px-6 pt-16 pb-10 md:pt-20">
        <Link to="/#home" aria-label="Mason Rental — naar home" className="block">
          <img
            src="/logo-mr.png"
            alt="Mason Rental"
            width={1288}
            height={203}
            className="mx-auto w-full max-w-4xl select-none lg:max-w-6xl"
          />
        </Link>
      </div>

      {/* Socials */}
      <div className="relative flex justify-center gap-3 px-6">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-night hover:shadow-[0_0_22px_-6px_var(--color-gold)]"
          >
            <social.icon size={20} weight="fill" aria-hidden="true" />
          </a>
        ))}
      </div>

      {/* Onderbalk */}
      <div className="relative mx-auto mt-12 flex max-w-4xl flex-col items-center gap-3 border-t border-white/10 px-6 py-6 text-xs text-white/35 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Mason Rental. Alle rechten voorbehouden.</p>
        <span className="inline-flex items-center gap-1.5">
          <MapPinIcon size={15} weight="duotone" className="text-gold" aria-hidden="true" />
          Amsterdam
        </span>
      </div>
    </footer>
  );
}
