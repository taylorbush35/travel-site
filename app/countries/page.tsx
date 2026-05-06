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
    <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-20 md:px-10 md:pb-20 md:pt-28">
      <header>
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          COUNTRIES
        </p>
        <h1 className="mb-2 mt-1 max-w-3xl text-5xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-6xl">
          Places I have visited, organized to help you choose your next trip.
        </h1>
        <p className="mb-0 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
          Browse each country for a concise overview, cities explored, and a
          clear starting point for your own itinerary.
        </p>
      </header>

      <div className="mt-16 border-t border-neutral-200/60 pt-12">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            Browse by Country
          </h2>
          <p className="text-sm text-[var(--color-text-muted)]">
            Curated notes from places I have explored.
          </p>
        </div>
        <CountryGrid countries={countries} />
      </div>
    </div>
  );
}
