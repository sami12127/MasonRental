import { useEffect } from "react";
import { OverOnsStory } from "../components/OverOnsStory";
import { WhyUs } from "../components/WhyUs";
import { ContactCTA } from "../components/ContactCTA";

export function OverOnsPage() {
  useEffect(() => {
    document.title = "Over ons | Mason Rental";
    return () => {
      document.title = "Mason Rental | Luxe Auto Verhuur";
    };
  }, []);

  return (
    <div className="pt-16 sm:pt-20">
      <OverOnsStory />
      <WhyUs
        eyebrow="Onze belofte"
        title={
          <>
            Zorgeloos <span className="text-gold">rijden</span>, van begin tot eind
          </>
        }
        intro="Van je eerste aanvraag tot het inleveren van de sleutels regelen wij alles tot in de puntjes. Heldere voorwaarden, snelle communicatie en persoonlijke aandacht — zodat huren bij Mason Rental net zo bijzonder voelt als de auto zelf."
      />
      <ContactCTA image="/cars/rs6-1.webp" imageAlt="Audi RS6" />
    </div>
  );
}
