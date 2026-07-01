import { Hero } from "../components/Hero";
import { Fleet } from "../components/Fleet";
import { WhyUs } from "../components/WhyUs";
import { HowItWorks } from "../components/HowItWorks";
import { About } from "../components/About";
import { Reviews } from "../components/Reviews";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";

export function HomePage() {
  return (
    <>
      <Hero />
      <Fleet />
      <WhyUs />
      <HowItWorks />
      <About />
      <Reviews />
      <FAQ />
      <Contact />
    </>
  );
}
