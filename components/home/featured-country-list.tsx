import Image from "next/image";
import Link from "next/link";
import { Country } from "@/lib/types";

type FeaturedCountryListProps = {
  countries: Country[];
};

export function FeaturedCountryList({ countries }: FeaturedCountryListProps) {
  const [featuredCountry, ...secondaryCountries] = countries.slice(0, 3);
  const [italy, vietnam] = secondaryCountries;

  if (!featuredCountry) return null;

  return (
    <div className="columns-1 gap-0 md:columns-2 md:gap-12 lg:gap-14">
      <Link
        href={`/countries/${featuredCountry.slug}`}
        className="group mb-12 block w-full max-w-2xl break-inside-avoid rounded-[26px] border border-[rgba(31,29,27,0.08)] bg-white/45 p-7 shadow-[0_1px_2px_rgba(31,29,27,0.04)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#f7f5f1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(31,29,27,0.2)] md:p-9"
      >
        <p className="mb-2.5 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-[#A39B95]">
          <span
            className="h-px w-5 shrink-0 bg-[rgba(31,29,27,0.14)]"
            aria-hidden
          />
          <span className="rounded-md bg-[#efe7dc]/40 px-2 py-0.5">
            Featured country
          </span>
        </p>
        <h3 className="text-[2rem] font-bold leading-tight tracking-tight text-[#1F1D1B] md:text-[2.35rem]">
          {featuredCountry.name}
        </h3>
        <p className="mt-3 text-xs tracking-wide text-[#625B55]/85">
          {featuredCountry.cities.join(" · ")}
        </p>
        <p className="mt-3 max-w-[28rem] text-[0.9375rem] italic leading-relaxed text-[#4F4945]">
          <span className="mr-1.5 not-italic text-[#A39B95]" aria-hidden>
            ✦
          </span>
          Helsinki surprised me in the best way — and I think it will for you
          too.
        </p>
        <p className="mt-4 text-base leading-8 text-[#625B55]">
          {featuredCountry.shortDescription}
        </p>
        <span className="mt-7 inline-flex text-sm font-medium text-[#625B55] underline-offset-4 decoration-transparent transition-all group-hover:underline">
          View guide →
        </span>

        <div className="mt-9 w-full">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <Image
              src="/DE0CA5F3-E35E-4BF5-A077-BBAD236EFF06_1_102_o.jpeg"
              alt="Helsinki Cathedral from Senate Square"
              fill
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 36rem, 100vw"
            />
          </div>
          <p className="mt-2 text-[11px] tracking-wide text-[#625B55]/60">
            helsinki · 2026
          </p>
        </div>
      </Link>

      {italy ? (
        <Link
          href={`/countries/${italy.slug}`}
          className="group mb-12 block w-full max-w-xl break-inside-avoid rounded-[22px] border border-[rgba(31,29,27,0.08)] bg-[#FBFAF8] p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#f6f4ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(31,29,27,0.2)] md:p-8"
        >
          <h3 className="text-2xl font-bold tracking-tight text-[#1F1D1B] md:text-[1.7rem]">
            {italy.name}
          </h3>
          <p className="mt-2 text-xs tracking-wide text-[#625B55]/85">
            {italy.cities.join(" · ")}
          </p>
          <p className="mt-4 text-sm leading-7 text-[#625B55]">
            {italy.shortDescription}
          </p>
          <span className="mt-5 inline-flex text-sm font-medium text-[#625B55] underline-offset-4 decoration-transparent transition-all group-hover:underline">
            View guide →
          </span>
        </Link>
      ) : null}

      {vietnam ? (
        <Link
          href={`/countries/${vietnam.slug}`}
          className="group mb-12 block w-full max-w-xl break-inside-avoid rounded-[22px] border border-[rgba(31,29,27,0.08)] bg-[#FBFAF8] p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#f6f4ef] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(31,29,27,0.2)] md:translate-x-1 md:p-8 lg:translate-x-2"
        >
          <h3 className="text-2xl font-bold tracking-tight text-[#1F1D1B] md:text-[1.7rem]">
            {vietnam.name}
          </h3>
          <p className="mt-2 text-xs tracking-wide text-[#625B55]/85">
            {vietnam.cities.join(" · ")}
          </p>
          <p className="mt-4 text-sm leading-7 text-[#625B55]">
            {vietnam.shortDescription}
          </p>
          <span className="mt-5 inline-flex text-sm font-medium text-[#625B55] underline-offset-4 decoration-transparent transition-all group-hover:underline">
            View guide →
          </span>
        </Link>
      ) : null}
    </div>
  );
}
