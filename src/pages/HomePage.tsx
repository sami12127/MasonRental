import { Hero } from "../components/Hero";
import { Showcase } from "../components/Showcase";
import { Fleet } from "../components/Fleet";
import { Reviews } from "../components/Reviews";
import { ContactCTA } from "../components/ContactCTA";

export function HomePage() {
  return (
    <>
      <Hero />
      <Showcase />
      <Fleet cta={{ label: "Bekijk het volledige aanbod", to: "/aanbod" }} />
      <Reviews />
      <ContactCTA image="/cars/rs6-1.webp" imageAlt="Audi RS6" />
    </>
  );
}
