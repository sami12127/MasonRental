import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useTransitionNavigate } from "./PageTransition";

type NavLink = { label: string; to: string; hash?: string };

const links: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Aanbod", to: "/aanbod" },
  { label: "Over ons", to: "/over-ons" },
  { label: "Contact & FAQ", to: "/contact" },
];

/** WhatsApp-link voor de Reserveer-knop — zelfde nummer als elders op de site. */
const WHATSAPP_URL = `https://wa.me/31618623757?text=${encodeURIComponent(
  "Hallo Mason Rental, ik wil graag een auto reserveren."
)}`;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const transitionNavigate = useTransitionNavigate();
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  // Navigeer met curtain-overgang waar mogelijk, anders instant.
  const nav = transitionNavigate ?? navigate;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Vergrendel het scrollen van de achtergrond zolang het fullscreen-menu open
  // is. body op position:fixed is de betrouwbaarste methode op mobiel — iOS
  // Safari negeert overflow:hidden vaak, en door de overflow-x:clip op <html>
  // wordt body-overflow niet aan de viewport doorgegeven. De scrollpositie
  // wordt bewaard en bij het sluiten hersteld.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  /** Navigeert naar een aparte pagina (bv. /aanbod), eventueel naar een sectie. */
  const goToPage = (to: string, hash?: string) => {
    setOpen(false);
    if (pathname === to) {
      // Al op deze pagina: scroll naar de sectie of naar boven.
      if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      nav(hash ? `${to}#${hash}` : to);
    }
  };

  const handleLink = (link: NavLink) => goToPage(link.to, link.hash);

  /** Markeert het huidige tabblad, ook op onderliggende pagina's. */
  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  const goHome = () => goToPage("/");

  return (
    <header
      className={`fixed inset-x-0 top-0 transition-all duration-300 ${
        open
          ? // Solide achtergrond (geen backdrop-filter) zodat de fixed-overlay de
            // hele viewport vult, en boven de WhatsApp-knop + cookiebalk getild.
            "z-[80] bg-night"
          : scrolled
          ? "z-50 border-b border-white/5 bg-night/85 backdrop-blur-xl"
          : "z-50 bg-gradient-to-b from-night/80 via-night/40 to-transparent"
      }`}
    >
      <nav
        aria-label="Hoofdnavigatie"
        className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:h-20 lg:px-10"
      >
        {/* Hamburger — links op mobiel, verborgen op desktop */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobiel-menu"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          className="-ml-2 inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:text-gold lg:hidden"
        >
          {open ? <XIcon size={24} /> : <ListIcon size={24} />}
        </button>

        {/* Logo — gecentreerd op mobiel, links op desktop */}
        <button
          type="button"
          onClick={goHome}
          aria-label="Mason Rental — naar home"
          className="absolute left-1/2 -translate-x-1/2 cursor-pointer lg:static lg:left-auto lg:translate-x-0"
        >
          <img
            src="/logo-mr.png"
            alt="Mason Rental"
            width={1288}
            height={203}
            className="h-7 w-auto sm:h-9"
          />
        </button>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => handleLink(link)}
                aria-current={isActive(link.to) ? "page" : undefined}
                className={`cursor-pointer text-lg font-bold transition-colors duration-200 hover:text-gold ${
                  isActive(link.to) ? "text-gold" : "text-white"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sweep [--sweep:var(--color-night)] border-2 border-gold hidden min-h-11 cursor-pointer items-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-night transition-all duration-300 hover:text-gold active:scale-[0.97] sm:inline-flex"
          >
            Reserveer
          </a>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobiel-menu"
            variants={
              reduceMotion
                ? {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
                    exit: { opacity: 0 },
                  }
                : {
                    hidden: { x: "-100%" },
                    visible: {
                      x: 0,
                      transition: {
                        duration: 0.4,
                        ease: [0.76, 0, 0.24, 1],
                        when: "beforeChildren",
                        staggerChildren: 0.07,
                      },
                    },
                    exit: {
                      x: "-100%",
                      transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
                    },
                  }
            }
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-0 flex flex-col items-center justify-center gap-10 bg-night lg:hidden"
          >
            <ul className="flex flex-col items-center gap-7">
              {links.map((link) => (
                <motion.li
                  key={link.label}
                  variants={
                    reduceMotion
                      ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
                      : {
                          hidden: { opacity: 0, y: 16 },
                          visible: { opacity: 1, y: 0 },
                          exit: { opacity: 0 },
                        }
                  }
                >
                  <button
                    type="button"
                    onClick={() => handleLink(link)}
                    aria-current={isActive(link.to) ? "page" : undefined}
                    className={`cursor-pointer text-3xl font-black tracking-tight transition-colors hover:text-gold ${
                      isActive(link.to) ? "text-gold" : "text-white"
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              variants={
                reduceMotion
                  ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
                  : {
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0 },
                      exit: { opacity: 0 },
                    }
              }
              className="btn-sweep [--sweep:var(--color-night)] border-2 border-gold inline-flex min-h-13 cursor-pointer items-center justify-center rounded-lg bg-gold px-10 text-base font-semibold text-night transition-all duration-300 hover:text-gold active:scale-[0.98]"
            >
              Reserveer
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
