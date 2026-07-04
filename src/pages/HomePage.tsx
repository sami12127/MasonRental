import { Hero } from "../components/Hero";
import { Fleet } from "../components/Fleet";
import { Showcase } from "../components/Showcase";
import { WhyUs } from "../components/WhyUs";
import { HowItWorks } from "../components/HowItWorks";
import { About } from "../components/About";
import { Reviews } from "../components/Reviews";
import { ContactCTA } from "../components/ContactCTA";

export function HomePage() {
  return (
    <>
      <Hero />
      <Fleet />
      <Showcase />
      <WhyUs />
      <HowItWorks />
      <About />
      <Reviews />
      <ContactCTA image="/cars/rs6-1.jpg" imageAlt="Audi RS6" />
    </>
  );
}
