import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { ListIcon, XIcon } from "@phosphor-icons/react";

type NavLink =
  | { label: string; id: string; to?: undefined }
  | { label: string; to: string; hash?: string; id?: undefined };

const links: NavLink[] = [
  { label: "Home", id: "home" },
  { label: "Aanbod", id: "aanbod" },
  { label: "Over ons", id: "over-ons" },
  { label: "Contact & FAQ", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Navigeert naar een homepage-sectie, ook vanaf een detailpagina. */
  const goToSection = (id: string) => {
    setOpen(false);
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  /** Navigeert naar een aparte pagina (bv. /contact), eventueel naar een sectie. */
  const goToPage = (to: string, hash?: string) => {
    setOpen(false);
    if (pathname === to && hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(hash ? `${to}#${hash}` : to);
    }
  };

  const handleLink = (link: NavLink) => {
    if (link.to) goToPage(link.to, link.hash);
    else goToSection(link.id);
  };

  const goHome = () => {
    setOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/5 bg-night/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Hoofdnavigatie"
        className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:h-20 lg:px-10"
      >
        {/* Hamburger — links op mobiel, verborgen op desktop */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
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
                className="cursor-pointer text-lg font-bold text-white transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goToPage("/contact", "contact")}
            className="hidden min-h-11 cursor-pointer items-center rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-night transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_28px_-8px_var(--color-gold)] active:scale-[0.97] sm:inline-flex"
          >
            Reserveer
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/5 bg-night/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col px-6 py-4">
              {links.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleLink(link)}
                    className="block w-full py-3.5 text-left text-base font-medium text-white/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pb-2 pt-3">
                <button
                  type="button"
                  onClick={() => goToPage("/contact", "contact")}
                  className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-night"
                >
                  Reserveer
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
