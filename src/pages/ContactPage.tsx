import { useEffect } from "react";
import { Contact } from "../components/Contact";
import { FAQ } from "../components/FAQ";
import { Social } from "../components/Social";
import { ContactCTA } from "../components/ContactCTA";

export function ContactPage() {
  useEffect(() => {
    document.title = "Contact & FAQ | Mason Rental";
    return () => {
      document.title = "Mason Rental | Luxe Auto Verhuur";
    };
  }, []);

  return (
    <div className="pt-16 sm:pt-20">
      <FAQ />
      <Contact />
      <Social />
      <ContactCTA image="/cars/rs6-1.webp" imageAlt="Audi RS6" />
    </div>
  );
}
