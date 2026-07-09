import { Hero } from "../components/Hero";
import { Showcase } from "../components/Showcase";
import { Fleet } from "../components/Fleet";
import { WhyUs } from "../components/WhyUs";
import { About } from "../components/About";
import { Reviews } from "../components/Reviews";
import { Social } from "../components/Social";
import { ContactCTA } from "../components/ContactCTA";

export function HomePage() {
  return (
    <>
      <Hero />
      <Showcase />
      <Fleet cta={{ label: "Bekijk het volledige aanbod", to: "/aanbod" }} />
      <WhyUs />
      <About />
      <Reviews />
      <Social />
      <ContactCTA image="/cars/rs6-1.webp" imageAlt="Audi RS6" />
    </>
  );
}
