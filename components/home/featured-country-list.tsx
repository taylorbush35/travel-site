import Link from "next/link";
import { CountryCityTags } from "@/components/countries/country-city-tags";
import { Country } from "@/lib/types";

type FeaturedCountryListProps = {
  countries: Country[];
};

export function FeaturedCountryList({ countries }: FeaturedCountryListProps) {
  const curatedCountries = countries.slice(0, 3);

  return (
    <ul className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-10">
      {curatedCountries.map((country) => (
        <li key={country.slug}>
          <div>
            <h3 className="mb-2 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
              {country.name}
            </h3>
            <CountryCityTags cities={country.cities} />
            <p className="mb-6 mt-2 text-sm leading-7 text-[var(--color-text-subtle)]">
              {country.shortDescription}
            </p>
            <Link
              href={`/countries/${country.slug}`}
              className="inline-flex text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-signature)]"
            >
              View guide
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
