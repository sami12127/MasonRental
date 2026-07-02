/* Audi vier-ringen logo (in elkaar grijpende ringen) als inline SVG, in echt zilver/chroom */
function AudiRings({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 108 34"
      fill="none"
      className={className}
      aria-label="Audi"
      role="img"
    >
      <defs>
        <linearGradient id="audiSilver" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#cfcfcf" />
          <stop offset="55%" stopColor="#8f8f8f" />
          <stop offset="80%" stopColor="#bdbdbd" />
          <stop offset="100%" stopColor="#f2f2f2" />
        </linearGradient>
      </defs>
      <g stroke="url(#audiSilver)" strokeWidth={3}>
        <circle cx="16" cy="17" r="15" />
        <circle cx="40" cy="17" r="15" />
        <circle cx="64" cy="17" r="15" />
        <circle cx="88" cy="17" r="15" />
      </g>
    </svg>
  );
}

export function BrandMarquee() {
  // Herhaal het logo zodat de carrousel altijd vult en soepel doorloopt
  const track = Array.from({ length: 12 });

  return (
    <div className="w-full">
      <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-white/40">
        Merken die wij aanbieden
      </p>

      <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-[marquee_24s_linear_infinite] items-center gap-14 pr-14 group-hover:[animation-play-state:paused]">
          {track.map((_, i) => (
            <AudiRings key={i} className="h-6 w-auto shrink-0 sm:h-7" />
          ))}
        </div>
      </div>
    </div>
  );
}
