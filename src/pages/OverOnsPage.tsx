import { useEffect } from "react";
import { About } from "../components/About";
import { WhyUs } from "../components/WhyUs";
import { Reviews } from "../components/Reviews";
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
        image="/cars/rs3-6573.webp"
        imageAlt="Audi RS3"
      />
      <About showHeading={false} />
      <WhyUs />
      <Reviews />
      <ContactCTA image="/cars/rs6-1.webp" imageAlt="Audi RS6" />
    </>
  );
}
