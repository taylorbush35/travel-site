import type { Metadata } from "next";
import { CountryGrid } from "@/components/countries/country-grid";
import { getAllCountries } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Countries",
  description: "Countries I have visited, with highlights for your next trip.",
};

export default function CountriesPage() {
  const countries = getAllCountries();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <section className="space-y-5">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-signature)]">
          Countries
        </p>
        <h1 className="max-w-3xl text-4xl font-medium tracking-tight text-[var(--color-text-primary)] md:text-5xl">
          Places I have visited, organized to help you choose your next trip.
        </h1>
        <p className="max-w-3xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
          Browse each country for a concise overview and practical highlights.
          This first version keeps the experience simple and focused.
        </p>
      </section>

      <section className="mt-12">
        <CountryGrid countries={countries} />
      </section>
    </div>
  );
}
