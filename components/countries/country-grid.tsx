import { Country } from "@/lib/types";
import { CountryCard } from "@/components/countries/country-card";

type CountryGridProps = {
  countries: Country[];
};

export function CountryGrid({ countries }: CountryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {countries.map((country) => (
        <CountryCard key={country.slug} country={country} />
      ))}
    </div>
  );
}
