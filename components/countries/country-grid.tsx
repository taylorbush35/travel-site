import { Country } from "@/lib/types";
import { CountryCard } from "@/components/countries/country-card";

type CountryGridProps = {
  countries: Country[];
  showTravelStyles?: boolean;
};

export function CountryGrid({
  countries,
  showTravelStyles = true,
}: CountryGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {countries.map((country) => (
        <CountryCard
          key={country.slug}
          country={country}
          showTravelStyles={showTravelStyles}
        />
      ))}
    </div>
  );
}
