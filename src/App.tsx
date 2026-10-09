import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { PageTransitionProvider } from "./components/PageTransition";
import { HomePage } from "./pages/HomePage";
import { CookieConsent } from "./components/CookieConsent";

/* Subpagina's in aparte chunks, zodat de homepage minder JS hoeft te laden. */
const loadAanbod = () => import("./pages/AanbodPage");
const loadOverOns = () => import("./pages/OverOnsPage");
const loadCarDetail = () => import("./pages/CarDetailPage");
const loadContact = () => import("./pages/ContactPage");
const loadPrivacy = () => import("./pages/PrivacyPage");
const AanbodPage = lazy(() => loadAanbod().then((m) => ({ default: m.AanbodPage })));
const OverOnsPage = lazy(() => loadOverOns().then((m) => ({ default: m.OverOnsPage })));
const CarDetailPage = lazy(() => loadCarDetail().then((m) => ({ default: m.CarDetailPage })));
const ContactPage = lazy(() => loadContact().then((m) => ({ default: m.ContactPage })));
const PrivacyPage = lazy(() => loadPrivacy().then((m) => ({ default: m.PrivacyPage })));

/** Haalt de subpagina's alvast op zodra de browser niets te doen heeft,
    zodat een paginawissel achter de curtain niet op het netwerk wacht. */
function PrefetchPages() {
  useEffect(() => {
    const prefetch = () =>
      [loadAanbod, loadOverOns, loadCarDetail, loadContact, loadPrivacy].forEach((load) => load());
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(prefetch, 3000);
    return () => clearTimeout(timer);
  }, []);
  return null;
}

/** Scrollt naar boven bij routewissel, of naar de sectie als er een hash is. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  // Zet de browser-scrollherstel op 'manual', anders herstelt de browser bij
  // een refresh de vorige scrollpositie (bv. de aanbod-sectie) en overschrijft
  // dat de scroll-naar-boven hieronder. Nu bepaalt de app zelf de positie.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        // Wacht tot de nieuwe pagina gerenderd is
        requestAnimationFrame(() =>
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        );
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <PageTransitionProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-night"
      >
        Naar hoofdinhoud
      </a>
      <ScrollManager />
      <Navbar />
      <PrefetchPages />
      <main id="main">
        <Suspense fallback={<div className="min-h-dvh" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aanbod" element={<AanbodPage />} />
            <Route path="/over-ons" element={<OverOnsPage />} />
            <Route path="/auto/:id" element={<CarDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacybeleid" element={<PrivacyPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </PageTransitionProvider>
  );
}
