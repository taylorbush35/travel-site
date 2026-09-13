/**
 * Full-page flight routes with real loops and lateral sweeps.
 * Motif is tiled vertically and scaled with slice so curves stay round
 * while still covering the whole layout.
 */
export function FlightPathBackground() {
  const strokeMain = "rgba(31, 29, 27, 0.18)";
  const strokeAccent = "rgba(31, 29, 27, 0.12)";
  const strokeSoft = "rgba(31, 29, 27, 0.09)";
  const planeBody = "rgba(31, 29, 27, 0.32)";
  const planeWing = "rgba(31, 29, 27, 0.26)";

  const dash = {
    strokeLinecap: "round" as const,
    strokeDasharray: "2 7",
    vectorEffect: "non-scaling-stroke" as const,
  };

  /* One wandering segment (~900 tall) with a clear loop + full-width travel */
  const segment = [
    "M -40 40",
    "C 160 10, 340 90, 520 50",
    "C 740 0, 980 80, 920 220",
    /* Pronounced loop */
    "C 860 340, 620 380, 480 280",
    "C 320 160, 280 360, 460 420",
    "C 680 500, 980 440, 940 620",
    "C 890 820, 560 740, 320 820",
    "C 80 900, -60 1040, 140 1120",
    "C 360 1210, 720 1120, 900 1240",
    "C 1080 1360, 820 1480, 560 1440",
  ].join(" ");

  const accent = [
    "M 1040 20",
    "C 820 70, 540 -20, 300 90",
    "C 80 200, -80 360, 100 480",
    "C 280 600, 620 520, 800 640",
    /* Counter-loop */
    "C 980 760, 860 980, 600 1020",
    "C 280 1070, 80 880, 140 700",
    "C 200 520, 480 620, 520 860",
    "C 560 1120, 200 1220, 60 1400",
  ].join(" ");

  const soft = [
    "M 60 -30",
    "C 40 180, 260 300, 520 240",
    "C 840 160, 1100 360, 960 560",
    "C 800 800, 240 720, 80 960",
    "C -60 1220, 260 1380, 560 1300",
    "C 900 1200, 1120 1480, 880 1600",
  ].join(" ");

  const tiles = [0, 900, 1800, 2700];

  return (
    <div
      className="flight-path-reveal pointer-events-none absolute inset-0 z-0 hidden min-h-full w-full overflow-hidden md:block"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full min-h-full"
        viewBox="0 0 1000 3600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin slice"
      >
        {tiles.map((offset, index) => (
          <g
            key={offset}
            transform={
              index % 2 === 0
                ? `translate(0 ${offset})`
                : `translate(1000 ${offset}) scale(-1 1)`
            }
          >
            <path d={soft} stroke={strokeSoft} strokeWidth="1.4" {...dash} />
            <path d={accent} stroke={strokeAccent} strokeWidth="1.5" {...dash} />
            <path d={segment} stroke={strokeMain} strokeWidth="1.7" {...dash} />
          </g>
        ))}

        <g transform="translate(720 260) rotate(-18) scale(2.1)">
          <path d="M -8 0 L 18 -3.6 L 18 3.6 Z" fill={planeBody} />
          <path d="M 0 -1.2 L 12.5 -7.8 L 12.5 7.8 Z" fill={planeWing} />
        </g>
      </svg>
    </div>
  );
}
