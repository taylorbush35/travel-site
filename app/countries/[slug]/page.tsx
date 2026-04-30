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
          className="inline-block text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-signature)]"
        >
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
          <ul className="flex flex-wrap gap-2 pt-1">
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
      </div>

      <section className="mt-10 overflow-hidden rounded-2xl border border-[var(--color-border)]">
        <div className="relative h-72 border-b border-[var(--color-border)] bg-[var(--color-accent-soft)] md:h-96">
          <Image
            src={country.heroImage}
            alt={`${country.name} hero`}
            fill
            className="object-cover p-16 opacity-70"
            priority
          />
        </div>
        <div className="space-y-6 p-8 md:p-10">
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
