/* Audi vier-ringen logo (in elkaar grijpende ringen) als inline SVG */
function AudiRings({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 108 34"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="17" r="15" />
      <circle cx="40" cy="17" r="15" />
      <circle cx="64" cy="17" r="15" />
      <circle cx="88" cy="17" r="15" />
    </svg>
  );
}

/* Merken die Mason Rental aanbiedt. Voeg hier gerust nieuwe merken toe. */
const brands = ["Audi"];

function BrandLogo({ brand }: { brand: string }) {
  return (
    <div className="flex shrink-0 items-center gap-3 text-white/45 transition-colors duration-300 hover:text-gold">
      {brand === "Audi" && <AudiRings className="h-5 w-auto sm:h-6" />}
      <span className="text-xl font-black uppercase tracking-wider sm:text-2xl">
        {brand}
      </span>
    </div>
  );
}

export function BrandMarquee() {
  // Bij één merk herhalen we het, zodat de carrousel altijd vult en loopt
  const base = brands.length < 4 ? Array(6).fill(brands).flat() : brands;
  const track = [...base, ...base];

  return (
    <div className="w-full">
      <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-white/40">
        Merken die wij aanbieden
      </p>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[marquee_24s_linear_infinite] items-center gap-14 pr-14 group-hover:[animation-play-state:paused]">
          {track.map((brand, i) => (
            <BrandLogo key={`${brand}-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}
