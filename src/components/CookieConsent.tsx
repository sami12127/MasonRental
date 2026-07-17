import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LottieIcon } from "./ui/LottieIcon";

/* localStorage-sleutel waarin wordt onthouden dat de melding is gezien. */
const STORAGE_KEY = "mr-cookie-consent";

/**
 * Cookiemelding. Verschijnt eenmalig bij het eerste bezoek en onthoudt in
 * localStorage dat hij is gezien. De site gebruikt uitsluitend functionele
 * cookies, dus is dit een informatieve melding met één bevestigingsknop.
 *
 * Zowel op mobiel als desktop een balk over de volle breedte die van onderen
 * omhoog schuift.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* localStorage niet beschikbaar (bv. private mode) — toon de melding. */
    }
    if (!stored) {
      // Korte vertraging zodat de melding rustig ná de pagina inschuift.
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "acknowledged");
    } catch {
      /* stil negeren wanneer opslaan niet lukt */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookiemelding"
          initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
          animate={reduceMotion ? { opacity: 1 } : { y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { y: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[70] border-t border-gold/25 bg-charcoal/95 backdrop-blur-md max-sm:pb-[env(safe-area-inset-bottom)]"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:px-10">
            <div className="flex items-start gap-4 sm:items-center">
              <LottieIcon
                src="/lottie_animations/cookies.json"
                className="inline-flex size-11 shrink-0"
              />
              <div className="min-w-0">
                <h2 className="text-base font-bold text-white">
                  Wij gebruiken cookies
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-white/70">
                  Wij plaatsen alleen functionele cookies die nodig zijn om de
                  website goed te laten werken en om je voorkeur te onthouden. Wij
                  volgen je niet. Meer weten? Lees ons{" "}
                  <Link
                    to="/privacybeleid"
                    className="font-medium text-gold underline underline-offset-2 transition-colors hover:text-gold-light"
                  >
                    privacybeleid
                  </Link>
                  .
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={dismiss}
              className="btn-sweep [--sweep:var(--color-night)] inline-flex min-h-11 w-full shrink-0 cursor-pointer items-center justify-center rounded-none bg-gold px-8 text-sm font-semibold text-night transition-all duration-300 hover:text-gold active:scale-[0.98] sm:w-auto"
            >
              Begrepen
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
