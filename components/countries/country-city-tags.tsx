type CountryCityTagsProps = {
  cities: string[];
  className?: string;
};

export function CountryCityTags({ cities, className = "" }: CountryCityTagsProps) {
  if (cities.length === 0) return null;

  return (
    <ul
      className={`flex flex-wrap gap-1.5 ${className}`}
      aria-label="Places explored"
    >
      {cities.map((city) => (
        <li
          key={city}
          className="rounded-full border border-[var(--color-signature)]/30 bg-[var(--color-signature-soft)]/50 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-[var(--color-signature)]"
        >
          {city}
        </li>
      ))}
    </ul>
  );
}
