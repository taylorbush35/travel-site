import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CountryGuideTemplate } from "@/components/countries/country-guide-template";
import { getAllCountries, getCountryBySlug } from "@/lib/countries";
import { getCountryGuideSections } from "@/lib/country-guides";

type CountryDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllCountries().map((country) => ({ slug: country.slug }));
}

export async function generateMetadata({
  params,
}: CountryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return { title: "Country" };
  return {
    title: country.name,
    description: country.shortDescription,
  };
}

export default async function CountryDetailPage({
  params,
}: CountryDetailPageProps) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  const guide = getCountryGuideSections(country);

  return <CountryGuideTemplate country={country} guide={guide} />;
}
