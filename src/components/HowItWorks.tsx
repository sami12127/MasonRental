import { steps } from "../data/content";
import { SectionHeading } from "./ui/SectionHeading";

export function HowItWorks() {
  return (
    <section className="bg-night py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading eyebrow="Hoe werkt het" title="In vier stappen op weg" />

        <ol className="relative grid gap-12 md:grid-cols-4 md:gap-8">
          {/* Verbindingslijn (desktop) */}
          <div
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent md:block"
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              {/* Geen scroll-reveal: de stappen staan er direct. */}
              <div className="flex items-start gap-5 md:flex-col md:items-center md:text-center">
                <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-night text-base font-bold text-gold shadow-[0_0_24px_-6px_var(--color-gold)]">
                  {i + 1}
                </div>
                <div className="pt-1.5 md:pt-5">
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    {step.description}
                  </p>
                </div>
              </div>
              {/* Verticale verbindingslijn (mobiel) */}
              {i < steps.length - 1 && (
                <span
                  className="absolute left-6 top-14 h-[calc(100%-0.5rem)] w-px -translate-x-1/2 bg-gradient-to-b from-gold/40 to-white/5 md:hidden"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
