import { Contact } from "../components/Contact";
import { FAQ } from "../components/FAQ";
import { Social } from "../components/Social";
import { ContactCTA } from "../components/ContactCTA";

export function ContactPage() {
  return (
    <div className="pt-16 sm:pt-20">
      <h1 className="sr-only">Contact met Mason Rental in Capelle aan den IJssel</h1>
      <Contact />
      <FAQ />
      <Social />
      <ContactCTA image="/cars/rs6-1.webp" imageAlt="Audi RS6" />
    </div>
  );
}
