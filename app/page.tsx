import Link from "next/link";
import { FeaturedCountries } from "@/components/home/featured-countries";
import { getFeaturedCountries } from "@/lib/countries";

export default function Home() {
  const featuredCountries = getFeaturedCountries();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-12 md:px-14 md:py-16">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-subtle)]">
            Travel Journal
          </p>
          <h1 className="text-4xl font-medium tracking-tight text-[var(--color-text-primary)] md:text-6xl">
            Clean, thoughtful travel inspiration for wherever you go next.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
            Travel planning and traveling bring me a lot of joy. This site
            shares countries I have visited and helps solo travelers, couples,
            and groups find a useful starting point for their own trips.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/countries"
              className="rounded-full border border-[var(--color-border-strong)] px-5 py-2 text-sm text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-accent-soft)]"
            >
              Explore countries
            </Link>
            <p className="text-sm text-[var(--color-text-subtle)]">
              Start with a region you are curious about.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-20">
        <FeaturedCountries countries={featuredCountries} />
      </div>
    </div>
  );
}
