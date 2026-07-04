import { useEffect } from "react";
import { Contact } from "../components/Contact";
import { FAQ } from "../components/FAQ";

export function ContactPage() {
  useEffect(() => {
    document.title = "Contact & FAQ | Mason Rental";
    return () => {
      document.title = "Mason Rental | Luxe Auto Verhuur";
    };
  }, []);

  return (
    <div className="pt-16 sm:pt-20">
      <Contact />
      <FAQ />
    </div>
  );
}
