import { useEffect } from "react";
import { Fleet } from "../components/Fleet";
import { HowItWorks } from "../components/HowItWorks";
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
      <HowItWorks />
    </>
  );
}
