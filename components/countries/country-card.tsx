import Link from "next/link";
import { CountryCityTags } from "@/components/countries/country-city-tags";
import { Country } from "@/lib/types";

type CountryCardProps = {
  country: Country;
};

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group flex flex-col rounded-2xl border border-neutral-200/60 bg-white/30 p-6 transition-colors hover:border-purple-200 hover:bg-white/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signature)]"
    >
      <h3 className="text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
        {country.name}
      </h3>
      <div className="mt-2">
        <CountryCityTags cities={country.cities} />
      </div>
      <p className="mt-4 flex-1 text-sm leading-7 text-[var(--color-text-subtle)]">
        {country.shortDescription}
      </p>
      <p className="mt-5 text-sm text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-signature)]">
        View guide →
      </p>
    </Link>
  );
}
