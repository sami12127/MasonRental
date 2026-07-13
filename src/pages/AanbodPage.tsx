import { useEffect } from "react";
import { Fleet } from "../components/Fleet";
import { WhyUs } from "../components/WhyUs";
import { Social } from "../components/Social";
import { ContactCTA } from "../components/ContactCTA";
import { PageHero } from "../components/ui/PageHero";

export function AanbodPage() {
  useEffect(() => {
    document.title = "Aanbod | Mason Rental";
    return () => {
      document.title = "Mason Rental | Luxe Auto Verhuur";
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Ons wagenpark"
        title="Ons"
        titleAccent="aanbod"
        description="Een zorgvuldig geselecteerd wagenpark met high-performance auto's, altijd in perfecte staat en klaar voor jouw moment."
        compact
      />
      <Fleet showHeading={false} />
      <WhyUs
        layout="stacked"
        eyebrow="Waarom Mason Rental?"
        title={
          <>
            De perfecte <span className="text-gold">auto</span>, service die
            klopt
          </>
        }
        intro="Bij ons draait alles om gemak en vertrouwen. Van het uitkiezen van jouw ideale auto tot het moment dat je wegrijdt, regelen wij elke stap soepel en met persoonlijke aandacht. Zo weet je precies waar je aan toe bent en kom je telkens weer bij ons terug."
      />
      <Social />
      <ContactCTA image="/cars/rs6-1.webp" imageAlt="Audi RS6" />
    </>
  );
}
