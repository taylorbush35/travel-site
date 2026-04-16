import Image from "next/image";
import Link from "next/link";
import { FeaturedCountries } from "@/components/home/featured-countries";
import { getFeaturedCountries } from "@/lib/countries";

export default function Home() {
  const featuredCountries = getFeaturedCountries();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-12 md:px-14 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-signature)]">
              Travel Journal
            </p>
            <h1 className="text-4xl font-medium tracking-tight text-[var(--color-text-primary)] md:text-6xl">
              Travel, but intentional.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
              Where I would go again, and where you might want to go next.
            </p>
            <p className="text-sm text-[var(--color-text-subtle)]">
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

          <div className="relative h-72 overflow-hidden rounded-2xl border border-[var(--color-border)] lg:h-[30rem]">
            <Image
              src="/images/header-flight.png"
              alt="View from an airplane window above the clouds"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 36vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-[var(--color-border)] px-6 py-8 md:mt-16 md:px-10 md:py-10">
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-8">
          <div className="relative h-64 overflow-hidden rounded-xl border border-[var(--color-border)] md:h-96">
            <Image
              src="/images/solo travel about.jpeg"
              alt="Taylor on a solo travel day"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 28vw, 100vw"
            />
          </div>

          <div className="max-w-lg justify-self-end">
            <div className="flex items-center gap-3">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-signature)]">
                ABOUT
              </p>
              <span
                className="h-px w-12 bg-[var(--color-signature)]/50"
                aria-hidden="true"
              />
            </div>
            <div className="mt-5 space-y-5">
              <p className="text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
                Like most people, I&apos;ve always wanted to travel.
              </p>
              <p className="text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
                In 2024, I finally booked my first solo international trip and
                never looked back.
              </p>
              <p className="text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
                What started as one trip turned into ten countries in two years
                -- and I&apos;m just getting started. I love planning travel
                almost as much as taking it, which is exactly why this site
                exists.
              </p>
              <p className="text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
                This is where I keep the places I&apos;ve been, what I&apos;d do
                again, and what I&apos;d recommend if you&apos;re planning your
                own trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-20">
        <FeaturedCountries countries={featuredCountries} />
      </div>
    </div>
  );
}
