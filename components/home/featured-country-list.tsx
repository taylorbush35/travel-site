import Link from "next/link";
import { CountryCityTags } from "@/components/countries/country-city-tags";
import { Country } from "@/lib/types";

type FeaturedCountryListProps = {
  countries: Country[];
};

export function FeaturedCountryList({ countries }: FeaturedCountryListProps) {
  return (
    <ul className="mt-2 flex flex-col gap-3 md:gap-3.5">
      {countries.map((country) => (
        <li key={country.slug}>
          <Link
            href={`/countries/${country.slug}`}
            className="group block rounded-xl border border-[var(--color-border)] px-4 py-6 transition-colors md:px-6 md:py-7"
          >
            <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-12 md:items-start md:gap-x-10 md:gap-y-0 lg:gap-x-14">
              <div className="min-w-0 space-y-3 md:col-span-5">
                <h3 className="text-[1.75rem] font-medium leading-[1.15] tracking-tight text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-signature)] md:text-[2rem]">
                  {country.name}
                </h3>
                <CountryCityTags cities={country.cities} />
              </div>
              <p className="min-w-0 text-[0.9375rem] font-light leading-[1.65] text-[var(--color-text-subtle)] md:col-span-7 md:text-[0.95rem] md:leading-[1.7]">
                {country.shortDescription}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
