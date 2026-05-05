import Image from "next/image";
import Link from "next/link";
import { FeaturedCountries } from "@/components/home/featured-countries";
import { getFeaturedCountries } from "@/lib/countries";

export default function Home() {
  const featuredCountries = getFeaturedCountries();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-14 md:px-10 md:py-20">
      <section className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            TRAVEL JOURNAL
          </p>
          <h1 className="mb-2 mt-1 text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-6xl">
            Travel, but intentional.
          </h1>
          <p className="mb-6 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
            Where I would go again, and where you might want to go next.
          </p>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-text-subtle)]">
            Built from my own travel experiences, and meant to help you plan
            yours.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/countries"
              className="rounded-full border border-[var(--color-signature)] bg-[var(--color-signature)] px-5 py-2 text-sm font-medium !text-white transition-colors hover:border-[var(--color-signature-strong)] hover:bg-[var(--color-signature-strong)] hover:!text-white"
            >
              Start exploring destinations
            </Link>
          </div>
        </div>

        <div className="relative h-80 w-full max-w-md justify-self-end overflow-hidden rounded-3xl shadow-[0_20px_55px_rgba(34,26,52,0.14)] md:h-96 lg:max-w-none lg:h-[28rem]">
          <Image
            src="/images/header-flight.png"
            alt="View from an airplane window above the clouds"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 42vw, 100vw"
          />
        </div>
      </section>

      <FeaturedCountries countries={featuredCountries} />

      <section className="mt-16 border-t border-neutral-200/60 pb-12 pt-12">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[320px_minmax(0,720px)] lg:gap-10">
          <div className="relative min-h-0 w-full overflow-hidden rounded-2xl max-lg:aspect-[3/4] lg:h-full">
            <Image
              src="/images/solo travel about.jpeg"
              alt="Taylor on a solo travel day"
              fill
              className="h-full w-full object-cover"
              sizes="(max-width: 1023px) 100vw, 320px"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                ABOUT
              </p>
              <span
                className="h-px w-10 bg-neutral-200/80"
                aria-hidden="true"
              />
            </div>
            <div className="mt-1.5 space-y-3">
              <p className="text-sm leading-6 text-[var(--color-text-muted)]">
                Like most people, I&apos;ve always wanted to travel.
              </p>
              <p className="text-sm leading-6 text-[var(--color-text-muted)]">
                In 2024, I finally booked my first solo international trip and
                never looked back.
              </p>
              <p className="text-sm leading-6 text-[var(--color-text-muted)]">
                What started as one trip turned into ten countries in two years
                - and I&apos;m just getting started. I love planning travel
                almost as much as doing it myself, which is exactly why this
                site exists.
              </p>
              <p className="text-sm leading-6 text-[var(--color-text-muted)]">
                This is where I keep the places I&apos;ve been, what I&apos;d do
                again, and what I&apos;d recommend if you&apos;re planning your
                own trip.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
