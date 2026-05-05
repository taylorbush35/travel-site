import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CountryCityTags } from "@/components/countries/country-city-tags";
import { getAllCountries, getCountryBySlug } from "@/lib/countries";

type CountryDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllCountries().map((country) => ({ slug: country.slug }));
}

export default async function CountryDetailPage({
  params,
}: CountryDetailPageProps) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 md:px-10 md:py-24">
      <div className="space-y-6">
        <Link
          href="/countries"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-signature)]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
          >
            <path
              d="M11.75 4.75L6.5 10l5.25 5.25"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to countries
        </Link>

        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-signature)]">
            {country.region}
          </p>
          <h1 className="text-4xl font-medium tracking-tight text-[var(--color-text-primary)] md:text-5xl">
            {country.name}
          </h1>
          <CountryCityTags cities={country.cities} className="pt-1" />
          <p className="max-w-3xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
            {country.shortDescription}
          </p>
        </div>
      </div>

      <section className="mt-14 space-y-10 md:mt-16">
        <div className="relative h-64 overflow-hidden rounded-3xl bg-[var(--color-accent-soft)] shadow-[0_16px_44px_rgba(34,26,52,0.1)] md:h-80">
          <Image
            src={country.heroImage}
            alt={`${country.name} hero`}
            fill
            className="object-cover p-12 opacity-75 md:p-16"
            priority
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-medium tracking-tight text-[var(--color-text-primary)]">
            Highlights
          </h2>
          <ul className="space-y-3">
            {country.highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-l border-[var(--color-signature)] pl-4 text-sm leading-7 text-[var(--color-text-muted)] md:text-base"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
