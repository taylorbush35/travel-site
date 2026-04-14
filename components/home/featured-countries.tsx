import Link from "next/link";
import { CountryGrid } from "@/components/countries/country-grid";
import { Country } from "@/lib/types";

type FeaturedCountriesProps = {
  countries: Country[];
};

export function FeaturedCountries({ countries }: FeaturedCountriesProps) {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
            Featured Destinations
          </p>
          <h2 className="max-w-xl text-3xl font-medium tracking-tight text-[var(--color-text-primary)] md:text-4xl">
            A few places to start planning your next trip.
          </h2>
        </div>
        <Link
          href="/countries"
          className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
        >
          Browse all countries
        </Link>
      </div>
      <CountryGrid countries={countries} />
    </section>
  );
}
