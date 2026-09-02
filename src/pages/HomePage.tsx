import { Hero } from "../components/Hero";
import { Showcase } from "../components/Showcase";
import { Fleet } from "../components/Fleet";
import { WhyUs } from "../components/WhyUs";
import { Reviews } from "../components/Reviews";
import { Social } from "../components/Social";
import { ContactCTA } from "../components/ContactCTA";

export function HomePage() {
  return (
    <>
      <Hero />
      <Fleet cta={{ label: "Bekijk het volledige aanbod", to: "/aanbod" }} />
      <Showcase />
      <WhyUs />
      <Reviews />
      <Social />
      <ContactCTA image="/cars/rs6-1.webp" imageAlt="Audi RS6" />
    </>
  );
}
