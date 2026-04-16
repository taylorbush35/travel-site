import Link from "next/link";
import { FeaturedCountryList } from "@/components/home/featured-country-list";
import { Country } from "@/lib/types";

type FeaturedCountriesProps = {
  countries: Country[];
};

export function FeaturedCountries({ countries }: FeaturedCountriesProps) {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] px-6 py-8 md:px-10 md:py-10">
      <div className="space-y-10 md:space-y-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-xl space-y-3">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-signature)]">
              Featured
            </p>
            <h2 className="text-3xl font-medium tracking-tight text-[var(--color-text-primary)] md:text-4xl">
              Where I&apos;d start
            </h2>
            <p className="text-base leading-relaxed text-[var(--color-text-muted)] md:text-[1.05rem]">
              A few places I&apos;d go back to — and recommend first.
            </p>
          </div>
          <Link
            href="/countries"
            className="shrink-0 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-signature)]"
          >
            Browse all countries
          </Link>
        </div>
        <FeaturedCountryList countries={countries} />
      </div>
    </section>
  );
}
