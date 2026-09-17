import type { HeroFact } from "@/lib/country-media";

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export function HeroFactIcon({
  icon,
  className = "h-5 w-5",
}: {
  icon: HeroFact["icon"];
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
      {icon === "calendar" ? (
        <>
          <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
          <path d="M8 3.5 V7.5 M16 3.5 V7.5 M4 10.5 H20" />
        </>
      ) : null}
      {icon === "climate" ? (
        <>
          <circle cx="12" cy="12" r="3.25" />
          <path d="M12 5.25 V3.5 M12 20.5 V18.75 M5.25 12 H3.5 M20.5 12 H18.75 M6.9 6.9 L5.7 5.7 M18.3 18.3 L17.1 17.1 M17.1 6.9 L18.3 5.7 M6.9 17.1 L5.7 18.3" />
        </>
      ) : null}
      {icon === "transit" ? (
        <>
          <path d="M5 16.5 C8 12.5, 11 19, 15 14.5 C17.5 11.5, 19 12.5, 21 11" />
          <circle cx="7.25" cy="16.15" r="1.15" />
        </>
      ) : null}
      {icon === "pin" ? (
        <>
          <path d="M12 21 C12 21, 6.5 14.2, 6.5 10.2 A5.5 5.5 0 0 1 17.5 10.2 C17.5 14.2, 12 21, 12 21 Z" />
          <circle cx="12" cy="10.2" r="1.8" />
        </>
      ) : null}
    </svg>
  );
}

export function WeatherIcon({
  kind,
  className = "h-5 w-5",
}: {
  kind: "sun" | "cloud" | "rain" | "snow" | "wind";
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...stroke}>
      {kind === "sun" ? (
        <>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M12 5 V3.6 M12 20.4 V19 M5 12 H3.6 M20.4 12 H19 M7 7 L5.9 5.9 M18.1 18.1 L17 17 M17 7 L18.1 5.9 M7 17 L5.9 18.1" />
        </>
      ) : null}
      {kind === "cloud" ? (
        <path d="M7.5 16.5 H17.2 A3.3 3.3 0 0 0 17.4 10.1 A4.6 4.6 0 0 0 9.2 9.4 A3.4 3.4 0 0 0 7.5 16.5 Z" />
      ) : null}
      {kind === "rain" ? (
        <>
          <path d="M7.5 14 H17.2 A3.3 3.3 0 0 0 17.4 7.6 A4.6 4.6 0 0 0 9.2 6.9 A3.4 3.4 0 0 0 7.5 14 Z" />
          <path d="M9 17 L8 20 M12.5 17 L11.5 20 M16 17 L15 20" />
        </>
      ) : null}
      {kind === "snow" ? (
        <>
          <path d="M12 4.5 V19.5 M6.5 7.5 L17.5 16.5 M17.5 7.5 L6.5 16.5" />
          <path d="M12 4.5 L10.6 6 M12 4.5 L13.4 6 M12 19.5 L10.6 18 M12 19.5 L13.4 18" />
        </>
      ) : null}
      {kind === "wind" ? (
        <>
          <path d="M4 10 H15.5 A2.4 2.4 0 1 0 15.5 5.2" />
          <path d="M4 14 H18 A2.2 2.2 0 1 1 18 18.4" />
        </>
      ) : null}
    </svg>
  );
}

export function PassportStamp({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 72 72"
      className={className}
      fill="none"
      aria-hidden
    >
      <circle
        cx="36"
        cy="36"
        r="24"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeDasharray="2.8 3.6"
      />
      <circle cx="36" cy="36" r="18" stroke="currentColor" strokeWidth="0.9" />
      <path
        d="M36 22.5 L37.8 32.2 L48 36 L37.8 39.8 L36 49.5 L34.2 39.8 L24 36 L34.2 32.2 Z"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AirplaneMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <path
        d="M4 18 L28 10 L20 22 L16.5 18.8 L11 26 L9.2 20.2 Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SuitcaseMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <rect x="8" y="16" width="32" height="22" rx="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M18 16 V12.5 A6 4.5 0 0 1 30 12.5 V16"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M8 24 H40" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="15.5" cy="29.5" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function MapLineMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 220" className={className} fill="none" aria-hidden>
      <path
        d="M18 12 C 48 40, 22 70, 52 98 C 86 128, 40 150, 70 182 C 88 202, 96 208, 110 214"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />
      <path
        d="M8 46 C 40 58, 70 38, 102 62"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeDasharray="2 7"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
