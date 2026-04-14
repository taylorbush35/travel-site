import Image from "next/image";
import Link from "next/link";
import { Country } from "@/lib/types";

type CountryCardProps = {
  country: Country;
};

export function CountryCard({ country }: CountryCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-colors hover:border-[var(--color-border-strong)]">
      <Link href={`/countries/${country.slug}`} className="block">
        <div className="relative h-48 w-full border-b border-[var(--color-border)] bg-[var(--color-accent-soft)]">
          <Image
            src={country.cardImage}
            alt={`${country.name} preview`}
            fill
            className="object-cover p-10 opacity-65 transition-opacity duration-300 group-hover:opacity-85"
          />
        </div>
        <div className="space-y-4 p-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-subtle)]">
              {country.region}
            </p>
            <h3 className="text-2xl font-medium tracking-tight text-[var(--color-text-primary)]">
              {country.name}
            </h3>
            <p className="text-sm leading-7 text-[var(--color-text-muted)]">
              {country.shortDescription}
            </p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {country.travelStyles.map((style) => (
              <li
                key={style}
                className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs capitalize tracking-wide text-[var(--color-text-muted)]"
              >
                {style}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
