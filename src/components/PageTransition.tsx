import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useAnimation, useReducedMotion } from "framer-motion";

type TransitionNavigate = (to: string) => void;

const TransitionContext = createContext<TransitionNavigate | null>(null);

/** Navigeer met de curtain-overgang (val terug op instant navigatie buiten de provider). */
export function useTransitionNavigate() {
  return useContext(TransitionContext);
}

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Curtain-overgang bij paginawissel. Volgorde is bewust:
 *   1. het scherm zakt van boven naar beneden en dekt de HUIDIGE pagina af
 *   2. pas als het volledig afgedekt is, wordt er genavigeerd (geen flits van
 *      de nieuwe pagina)
 *   3. het scherm schuift verder naar beneden weg en onthult de nieuwe pagina
 *
 * Interne <Link>-clicks worden globaal onderschept; de Navbar gebruikt
 * useTransitionNavigate() voor zijn programmatige navigatie.
 */
export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const curtain = useAnimation();
  const logo = useAnimation();
  const shimmer = useAnimation();
  const running = useRef(false);

  const go = useCallback(
    async (to: string) => {
      const url = new URL(to, window.location.origin);
      const targetPath = url.pathname;

      // Zelfde pagina (alleen hash) of reduced motion → direct, geen curtain.
      if (reduceMotion || targetPath === location.pathname) {
        navigate(to);
        return;
      }
      if (running.current) return;
      running.current = true;

      // 1. Scherm zakt naar beneden en dekt de huidige pagina af.
      //    Het logo fade't in, schaalt subtiel op en krijgt een zachte
      //    gouden glow — premium merkintro.
      curtain.set({ y: "-100%" });
      logo.set({
        opacity: 0,
        scale: 0.92,
        filter: "drop-shadow(0 0 0px rgba(201,163,78,0))",
      });
      shimmer.set({ backgroundPosition: "-60% 0" });
      await Promise.all([
        curtain.start({ y: "0%", transition: { duration: 0.6, ease: EASE } }),
        logo.start({
          opacity: 1,
          scale: 1,
          filter: [
            "drop-shadow(0 0 0px rgba(201,163,78,0))",
            "drop-shadow(0 0 26px rgba(201,163,78,0.5))",
            "drop-shadow(0 0 14px rgba(201,163,78,0.28))",
          ],
          transition: { duration: 0.75, ease: "easeOut" },
        }),
      ]);

      // Eén elegante gouden light-sweep die over het logo glijdt.
      shimmer.start({
        backgroundPosition: "160% 0",
        transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
      });

      // 2. Navigeer nu de pagina volledig afgedekt is.
      navigate(to);

      // Even vasthouden met het logo in beeld (light-sweep loopt af).
      await new Promise((r) => setTimeout(r, 520));

      // 3. Logo vervaagt, scherm schuift verder weg → nieuwe pagina.
      logo.start({ opacity: 0, transition: { duration: 0.35 } });
      await curtain.start({ y: "100%", transition: { duration: 0.65, ease: EASE } });

      running.current = false;
    },
    [navigate, location.pathname, reduceMotion, curtain, logo, shimmer]
  );

  // Onderschep interne link-clicks zodat elke <Link> de curtain krijgt.
  useEffect(() => {
    if (reduceMotion) return;
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (/^(https?:|mailto:|tel:)/i.test(href)) return;

      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;
      // Alleen-hash op dezelfde pagina → gewoon scrollen, geen curtain.
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();
      go(url.pathname + url.hash);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [go, reduceMotion]);

  return (
    <TransitionContext.Provider value={go}>
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-night"
        initial={{ y: "-100%" }}
        animate={curtain}
      >
        <motion.div
          className="relative isolate w-72 max-w-[72vw] md:w-[26rem]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={logo}
        >
          <img
            src="/logo-curtain.png"
            alt=""
            width={688}
            height={518}
            className="block w-full"
          />
          {/* Gouden light-sweep, gemaskeerd op de logo-vorm. */}
          <motion.span
            aria-hidden="true"
            className="logo-shimmer absolute inset-0"
            initial={{ backgroundPosition: "-60% 0" }}
            animate={shimmer}
          />
        </motion.div>
      </motion.div>
    </TransitionContext.Provider>
  );
}
