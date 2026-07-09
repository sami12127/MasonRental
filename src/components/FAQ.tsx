import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { faqs } from "../data/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const WHATSAPP_NUMBER = "31618623757";
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hallo Mason Rental, ik heb nog een vraag."
)}`;

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-night pt-12 pb-24 md:pt-16 md:pb-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading eyebrow="FAQ" title="Veelgestelde vragen" spacing="tight" />

        <div className="grid items-start gap-4 md:grid-cols-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.question} delay={i * 0.06}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen ? "border-gold/40 bg-night/70" : "border-white/10 bg-night/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-white">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`shrink-0 ${isOpen ? "text-gold" : "text-white/50"}`}
                      aria-hidden="true"
                    >
                      <PlusIcon size={20} weight="bold" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-mist">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-white/10 bg-night/40 px-6 py-8 text-center md:mt-12 md:px-10">
            <p className="text-base leading-relaxed text-mist">
              Zit jouw vraag er niet tussen? Geen probleem — wij zijn snel
              bereikbaar. Stuur ons gerust een berichtje via WhatsApp, tik ons
              aan op TikTok, Instagram of Snapchat, of bel ons even. We denken
              graag met je mee.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-7 text-sm font-bold uppercase tracking-wide text-night transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_36px_-8px_var(--color-gold)] active:scale-[0.97]"
            >
              <WhatsappLogoIcon size={18} weight="fill" aria-hidden="true" />
              Stel je vraag via WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
