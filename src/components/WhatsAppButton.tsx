import { WhatsappLogoIcon } from "@phosphor-icons/react";

/* Zwevende WhatsApp-knop rechtsonder, zichtbaar op elke pagina. */
export function WhatsAppButton() {
  const href = `https://wa.me/31618623757?text=${encodeURIComponent(
    "Hallo Mason Rental, ik heb een vraag over het huren van een auto."
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Neem contact op via WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_-6px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-110 active:scale-95"
    >
      <WhatsappLogoIcon size={30} weight="fill" aria-hidden="true" />
    </a>
  );
}
