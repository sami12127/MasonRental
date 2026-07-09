import { useEffect } from "react";
import { About } from "../components/About";
import { WhyUs } from "../components/WhyUs";
import { ContactCTA } from "../components/ContactCTA";
import { PageHero } from "../components/ui/PageHero";

export function OverOnsPage() {
  useEffect(() => {
    document.title = "Over ons | Mason Rental";
    return () => {
      document.title = "Mason Rental | Luxe Auto Verhuur";
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Over Mason Rental"
        title="Alleen het beste is"
        titleAccent="goed genoeg"
        description="Exclusieve autoverhuur zonder gedoe — voor klanten die alleen genoegen nemen met het beste."
      />
      <About
        showHeading={false}
        text="Wat begon uit pure passie voor bijzondere auto's is uitgegroeid tot Mason Rental — dé plek in Amsterdam om high-performance auto's te huren. Elke auto in ons wagenpark kiezen we met zorg en houden we in topconditie, zodat jij zonder omkijken kunt genieten van elke kilometer."
      />
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
    </>
  );
}
