import Link from "next/link";
import { FeaturedCountryList } from "@/components/home/featured-country-list";
import { Country } from "@/lib/types";

type FeaturedCountriesProps = {
  countries: Country[];
};

export function FeaturedCountries({ countries }: FeaturedCountriesProps) {
  return (
    <section className="mt-16 border-t border-neutral-200/60 pt-12">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        Featured
      </p>
      <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="max-w-xl">
          <h2 className="mb-2 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-4xl">
            Where I&apos;d start
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
            A few places I&apos;d go back to — and recommend first.
          </p>
        </div>
        <Link
          href="/countries"
          className="shrink-0 self-start text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-signature)] md:self-auto"
        >
          Browse all countries
        </Link>
      </div>
      <div className="mt-8">
        <FeaturedCountryList countries={countries} />
      </div>
    </section>
  );
}
