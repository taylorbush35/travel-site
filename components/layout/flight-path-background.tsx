/**
 * Full-page flight route: hero → Finland featured zone → continuation → bottom curl.
 * Single main path reads as one journey; right ribbon parallels in the margin.
 */
export function FlightPathBackground() {
  const strokeMain = "rgba(31, 29, 27, 0.28)";
  const strokeAccent = "rgba(31, 29, 27, 0.22)";
  const planeBody = "rgba(31, 29, 27, 0.30)";
  const planeWing = "rgba(31, 29, 27, 0.25)";

  const dash = {
    strokeLinecap: "round" as const,
    strokeDasharray: "2 6",
    vectorEffect: "non-scaling-stroke" as const,
  };

  /* Finland approach: left column, slightly inward toward featured card */
  const px = 262;
  const py = 1418;

  /* One continuous path: hero → vertical hero/featured band → Finland → down → bottom sweep */
  const mainJourney = [
    "M 44 40",
    "C 158 108, 278 218, 208 338",
    "C 128 468, 78 598, 165 758",
    "C 232 918, 198 1048, 178 1178",
    "C 152 1310, 175 1372, 218 1402",
    "C 238 1414, 252 1418, 262 1418",
    "C 272 1525, 228 1765, 198 2045",
    "C 168 2445, 248 2785, 392 3025",
    "C 528 3245, 712 3285, 875 3105",
    "C 938 2985, 918 2825, 765 2715",
    "Q 520 2565, 295 2755",
    "Q 145 2885, 72 2765",
  ].join(" ");

  return (
    <div
      className="flight-path-reveal pointer-events-none absolute inset-0 z-0 hidden min-h-full w-full overflow-visible md:block"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full min-h-full overflow-visible"
        viewBox="0 0 1000 3600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMin meet"
      >
        <path
          d={mainJourney}
          stroke={strokeMain}
          strokeWidth="1.6"
          {...dash}
        />

        <g transform={`translate(${px}, ${py}) rotate(17) scale(1.95)`}>
          <path d="M -8 0 L 18 -3.6 L 18 3.6 Z" fill={planeBody} />
          <path d="M 0 -1.2 L 12.5 -7.8 L 12.5 7.8 Z" fill={planeWing} />
        </g>

        <g className="hidden lg:block">
          <path
            d="M 938 95 C 895 455, 978 905, 922 1445 C 872 2085, 925 2655, 882 3225 C 858 3420, 775 3520, 655 3465"
            stroke={strokeAccent}
            strokeWidth="1.6"
            {...dash}
          />
        </g>
      </svg>
    </div>
  );
}
