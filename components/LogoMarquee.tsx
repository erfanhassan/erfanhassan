"use client";

// ─── Actual logo images from public/logos/ ───────────────────────────────────
// All logos are light-grey on white PNGs. We use CSS filter invert(1) + brightness
// to flip them to white-on-transparent so they look great on the dark background.

const LOGOS = [
  { id: "untitled",    src: "/logos/Untitled design.png",   label: "Brand 1",           width: 320 },
  { id: "untitled-2",  src: "/logos/Untitled design-2.png", label: "Brand 2",           width: 400 },
  { id: "untitled-3",  src: "/logos/Untitled design-3.png", label: "Brand 3",           width: 300 },
  { id: "untitled-4",  src: "/logos/Untitled design-4.png", label: "Brand 4",           width: 300 },
  { id: "untitled-5",  src: "/logos/Untitled design-5.png", label: "SK Overseas",       width: 400 },
  { id: "untitled-7",  src: "/logos/Untitled design-7.png", label: "Emma",              width: 280 },
  { id: "untitled-8",  src: "/logos/Untitled design-8.png", label: "Four Seasons",      width: 400 },
];

// ─── Marquee strip (duplicated for seamless loop) ───────────────────────────
export default function LogoMarquee() {
  // Triple the array so we can loop seamlessly by translating -33.333%
  const tripled = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section
      id="logo-marquee"
      aria-label="Clients and partners"
      className="relative w-full overflow-hidden py-16 md:py-20 mt-24 md:mt-32"
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }}
      />

      {/* Section label */}
      <p className="text-center text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-[#888] mb-16">
        Trusted by global brands
      </p>

      {/* Scrolling track */}
      <div
        className="flex items-center gap-32 md:gap-40"
        style={{
          width: "max-content",
          animation: "marquee-rtl 32s linear infinite",
        }}
      >
        {tripled.map((logo, i) => (
          <div
            key={`${logo.id}-${i}`}
            className="flex-shrink-0 flex items-center justify-center"
            title={logo.label}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.label}
              width={logo.width}
              height={140}
              draggable={false}
              style={{
                width: logo.width,
                height: 140,
                objectFit: "contain",
                // brightness(0) makes it black, invert(1) makes it pure white
                filter: "brightness(0) invert(1)",
                opacity: 1,
                userSelect: "none",
              }}
            />
          </div>
        ))}
      </div>

      {/* Keyframe — right-to-left (translate from 0 → -33.333%) */}
      <style>{`
        @keyframes marquee-rtl {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
