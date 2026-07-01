import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  CarProfileIcon,
  DoorOpenIcon,
  EngineIcon,
  GaugeIcon,
  GearSixIcon,
  TireIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { cars } from "../data/cars";
import type { CarSpec } from "../data/cars";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const specIcons: Record<CarSpec["icon"], Icon> = {
  power: GaugeIcon,
  engine: EngineIcon,
  drivetrain: TireIcon,
  gearbox: GearSixIcon,
  doors: DoorOpenIcon,
  body: CarProfileIcon,
};

export function Fleet() {
  return (
    <section id="aanbod" className="bg-night py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Wagenpark"
          title="Ons exclusieve aanbod"
          description="Een zorgvuldig geselecteerd wagenpark met high-performance auto's, altijd in perfecte staat."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {cars.map((car, i) => (
            <Reveal key={car.id} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Link
                  to={`/auto/${car.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-charcoal transition-colors duration-300 hover:border-gold/40"
                  aria-label={`Bekijk de ${car.name}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={car.image}
                      alt={car.name}
                      loading="lazy"
                      width={1400}
                      height={875}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                    <span className="absolute right-4 top-4 rounded-full bg-night/70 px-4 py-1.5 text-sm font-semibold text-gold backdrop-blur-md">
                      €{car.pricePerDay} <span className="text-white/60">p/d</span>
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-7 md:p-9">
                    <h3 className="text-2xl font-bold text-white">{car.name}</h3>
                    <p className="mt-1.5 text-sm text-mist">{car.tagline}</p>

                    <ul className="mt-6 flex flex-wrap gap-2.5">
                      {car.specs.map((spec) => {
                        const SpecIcon = specIcons[spec.icon];
                        return (
                          <li
                            key={spec.label}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-graphite px-3.5 py-1.5 text-xs font-medium text-white/80"
                          >
                            <SpecIcon
                              size={15}
                              weight="duotone"
                              className="text-gold"
                              aria-hidden="true"
                            />
                            {spec.label}
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-8 flex items-center justify-between pt-2">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
                        Bekijk details
                        <ArrowRightIcon
                          size={16}
                          weight="bold"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
