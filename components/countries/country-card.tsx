import Image from "next/image";
import Link from "next/link";
import { CountryCityTags } from "@/components/countries/country-city-tags";
import { hasPhotographicAsset } from "@/lib/country-media";
import { Country } from "@/lib/types";

type CountryCardProps = {
  country: Country;
};

export function CountryCard({ country }: CountryCardProps) {
  const photo = hasPhotographicAsset(country.cardImage);

  return (
    <Link
      href={`/countries/${country.slug}`}
      className="group flex flex-col overflow-hidden rounded-[1.15rem] border border-[rgba(31,29,27,0.08)] bg-[var(--color-surface)] transition-[border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(91,58,142,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-signature)]"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#e8e0d6]">
        {photo ? (
          <Image
            src={country.cardImage}
            alt=""
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 18rem, (min-width: 768px) 45vw, 100vw"
          />
        ) : (
          <EditorialPhotoFallback />
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 md:px-5 md:pb-5 md:pt-5">
        <h3 className="font-display text-[1.7rem] leading-[1.15] tracking-tight text-[var(--color-text-primary)]">
          {country.name}
        </h3>
        <div className="mt-2.5">
          <CountryCityTags cities={country.cities} />
        </div>
        <p className="mt-3.5 flex-1 text-sm leading-7 text-[var(--color-text-subtle)]">
          {country.shortDescription}
        </p>
        <span
          className="mt-5 ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-signature-soft)] text-[var(--color-signature)] transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        >
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
            <path
              d="M7.25 4.75L12.5 10l-5.25 5.25"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="sr-only">View guide</span>
      </div>
    </Link>
  );
}

function EditorialPhotoFallback() {
  return (
    <div
      className="absolute inset-0 bg-[linear-gradient(155deg,#f3ece3_0%,#e7ddd2_52%,#d9cfc4_100%)]"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.45]"
        viewBox="0 0 320 200"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-10 130 C 60 70, 140 160, 210 90 C 260 40, 310 110, 340 70"
          stroke="rgba(91,58,142,0.26)"
          strokeWidth="1.2"
          strokeDasharray="2 7"
          strokeLinecap="round"
        />
        <path
          d="M 20 40 C 90 20, 150 80, 240 48"
          stroke="rgba(31,29,27,0.12)"
          strokeWidth="1"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
