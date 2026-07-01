import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { ListIcon, XIcon } from "@phosphor-icons/react";

const links = [
  { label: "Home", id: "home" },
  { label: "Aanbod", id: "aanbod" },
  { label: "Over ons", id: "over-ons" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
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
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10"
      >
        <button
          type="button"
          onClick={goHome}
          className="cursor-pointer text-xl font-bold tracking-tight text-white"
        >
          MASON<span className="text-gold"> RENTAL</span>
        </button>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => goToSection(link.id)}
                className="cursor-pointer text-sm font-medium text-white/70 transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goToSection("contact")}
            className="hidden min-h-11 cursor-pointer items-center rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-night transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_28px_-8px_var(--color-gold)] active:scale-[0.97] sm:inline-flex"
          >
            Reserveer
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:text-gold lg:hidden"
          >
            {open ? <XIcon size={24} /> : <ListIcon size={24} />}
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
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => goToSection(link.id)}
                    className="block w-full py-3.5 text-left text-base font-medium text-white/80 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pb-2 pt-3">
                <button
                  type="button"
                  onClick={() => goToSection("contact")}
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
