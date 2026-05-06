import Image from "next/image";
import Link from "next/link";
import { FeaturedCountries } from "@/components/home/featured-countries";
import { getFeaturedCountries } from "@/lib/countries";

export default function Home() {
  const featuredCountries = getFeaturedCountries();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28 lg:pt-32">
      <section className="relative isolate flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-12">
        <div className="max-w-2xl flex-1 lg:max-w-none lg:pr-6 lg:pt-1">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#A39B95]">
            TRAVEL JOURNAL
          </p>
          <h1 className="mt-1.5 text-4xl font-semibold leading-[1.16] tracking-tight text-[#1F1D1B] md:text-5xl md:leading-[1.14] lg:text-[3.2rem] lg:leading-[1.12]">
            Travel, but make it intentional.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-[1.72] text-[#4F4945] md:text-[1.0625rem] md:leading-[1.76]">
            The places I&apos;d go back to in a heartbeat — and how I&apos;d do
            them better the second time.
          </p>
          <div className="mt-6 max-w-xl border-t border-neutral-200/70 pt-4">
            <div className="space-y-3.5">
              <p className="text-sm leading-6 text-[#625B55]">
                Like most people, I&apos;ve always wanted to travel.
              </p>
              <p className="text-sm leading-6 text-[#625B55]">
                In 2024, I finally booked my first solo international trip and
                never looked back.
              </p>
              <p className="text-sm leading-6 text-[#625B55]">
                What started as one trip turned into ten countries in two years
                — and I&apos;m just getting started. I love planning travel
                almost as much as doing it myself, which is exactly why this
                site exists.
              </p>
              <p className="text-sm leading-6 text-[#625B55]">
                This is where I keep the places I&apos;ve been, what I&apos;d do
                again, and what I&apos;d recommend if you&apos;re planning your
                own trip.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/countries"
              className="inline-flex items-center rounded-xl border border-[#D8CFC4] bg-[#EFE7DC] px-6 py-2.5 text-sm font-medium text-[#2D2926] shadow-none transition-all duration-300 ease-out hover:scale-[1.035] hover:border-[#c9bcae] hover:bg-[#e5dccf] hover:text-[#2D2926] active:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c5466]/45"
            >
              Explore destinations →
            </Link>
          </div>
        </div>

        <div className="group relative flex w-full flex-1 items-end pb-12 lg:justify-end lg:pb-0">
          <div className="relative h-80 w-full max-w-[22rem] origin-[55%_45%] overflow-hidden rounded-[1.35rem] shadow-[0_14px_44px_-12px_rgba(42,38,34,0.16),0_6px_22px_-14px_rgba(42,38,34,0.08)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:rotate(1deg)_translateY(0.6rem)] group-hover:[transform:rotate(1deg)_translateY(0.15rem)_scale(1.02)] group-hover:shadow-[0_20px_52px_-14px_rgba(42,38,34,0.18),0_8px_28px_-12px_rgba(42,38,34,0.1)] sm:max-w-none md:h-96 lg:h-full lg:max-h-full lg:min-h-[24rem] lg:max-w-[26rem]">
            <Image
              src="/images/header-flight.png"
              alt="View from an airplane window above the clouds"
              fill
              priority
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 400px, 100vw"
            />
          </div>
          <div className="absolute bottom-0 left-4 z-10 h-[10.5rem] w-[64%] origin-[48%_52%] overflow-hidden rounded-[1.25rem] border-[3px] border-white/90 shadow-[0_16px_36px_-16px_rgba(40,34,30,0.42)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:rotate(-2deg)_translateY(18%)] group-hover:[transform:rotate(-2deg)_translateY(12%)_scale(1.02)] sm:h-[11.5rem] md:h-[12.5rem] lg:bottom-6 lg:left-1 lg:w-[66%]">
            <Image
              src="/images/solo travel about.jpeg"
              alt="Taylor capturing a travel memory in the city"
              fill
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 240px, 62vw"
            />
          </div>
        </div>
      </section>

      <FeaturedCountries countries={featuredCountries} />

    </div>
  );
}
