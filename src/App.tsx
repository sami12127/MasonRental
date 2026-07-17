import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { PageTransitionProvider } from "./components/PageTransition";
import { HomePage } from "./pages/HomePage";
import { AanbodPage } from "./pages/AanbodPage";
import { OverOnsPage } from "./pages/OverOnsPage";
import { CarDetailPage } from "./pages/CarDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { CookieConsent } from "./components/CookieConsent";

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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-none focus:bg-gold focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-night"
      >
        Naar hoofdinhoud
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/aanbod" element={<AanbodPage />} />
          <Route path="/over-ons" element={<OverOnsPage />} />
          <Route path="/auto/:id" element={<CarDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacybeleid" element={<PrivacyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </PageTransitionProvider>
  );
}
