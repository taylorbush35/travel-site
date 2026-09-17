import type { Metadata } from "next";
import { CountryGrid } from "@/components/countries/country-grid";
import { getAllCountries } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Countries",
  description: "Countries I have visited, with highlights for your next trip.",
};

export default function CountriesPage() {
  const countries = [...getAllCountries()].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );

  return (
    <div className="relative mx-auto w-full max-w-5xl px-6 pb-20 pt-20 md:px-10 md:pb-24 md:pt-28">
      <header className="max-w-[40rem] lg:max-w-[42rem]">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A39B95]">
          COUNTRIES
        </p>
        <h1 className="mt-3 font-display text-[2.55rem] leading-[1.12] tracking-tight text-[var(--color-text-primary)] md:text-[3.25rem] md:leading-[1.08] lg:text-[3.45rem]">
          Places I have visited,
          <br />
          organized to help you
          <br />
          choose your next trip.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-[1.75] text-[var(--color-text-muted)] md:text-[1.0625rem] md:leading-[1.8]">
          Browse each country for a concise overview, cities explored, and a
          clear starting point for your own itinerary.
        </p>
      </header>

      <div className="relative mt-16 md:mt-20">
        <div className="h-px w-full bg-[rgba(31,29,27,0.1)]" />
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 hidden h-8 w-28 -translate-x-1/2 -translate-y-1/2 md:block"
          viewBox="0 0 112 32"
          fill="none"
          aria-hidden
        >
          <path
            d="M 4 18 C 28 6, 52 26, 76 12 C 90 4, 102 16, 108 10"
            stroke="rgba(91,58,142,0.45)"
            strokeWidth="1.15"
            strokeDasharray="2 5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <section className="relative pt-12 md:pt-14">
        <div className="mb-9 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="font-display text-[1.85rem] leading-tight tracking-tight text-[var(--color-text-primary)] md:text-[2.15rem]">
              Browse by Country
            </h2>
            <span
              className="mt-3 block h-px w-10 bg-[var(--color-signature)]/45"
              aria-hidden
            />
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-[0.9375rem]">
              Curated notes from places I have explored.
            </p>
          </div>
          <p
            className="hidden font-hand text-[1.35rem] leading-none text-[var(--color-signature)] md:block md:-translate-y-1 md:rotate-[-8deg]"
            aria-hidden
          >
            more to explore ♡
          </p>
        </div>

        <CountryGrid countries={countries} />

        <svg
          className="pointer-events-none absolute -bottom-3 right-1 hidden h-14 w-14 text-[var(--color-signature)] opacity-[0.38] md:block"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden
        >
          <circle
            cx="32"
            cy="32"
            r="22"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeDasharray="2.5 3.5"
          />
          <circle cx="32" cy="32" r="16.5" stroke="currentColor" strokeWidth="0.85" />
          <path
            d="M32 20.5 L33.6 29.2 L42 32 L33.6 34.8 L32 43.5 L30.4 34.8 L22 32 L30.4 29.2 Z"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
        </svg>
      </section>

      <div className="countries-map-edge hidden md:block" aria-hidden />
    </div>
  );
}
