import Image from "next/image";
import Link from "next/link";
import type { Country } from "@/lib/types";
import type { CountryGuideSections, FoodEntry } from "@/lib/country-guide-types";
import { CountryGuideNav } from "@/components/countries/country-guide-nav";
import { CountryCityTags } from "@/components/countries/country-city-tags";

type CountryGuideTemplateProps = {
  country: Country;
  guide: CountryGuideSections;
};

function GuideSectionTitle({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <header className="mb-8 md:mb-10">
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#A39B95]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-[1.65rem]">
        {title}
      </h2>
    </header>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={`${i}-${item.slice(0, 24)}`}
          className="border-l border-[rgba(31,29,27,0.12)] pl-4 text-sm leading-7 text-[var(--color-text-muted)] md:text-[0.9375rem]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function FoodBlock({
  label,
  entries,
}: {
  label: string;
  entries: FoodEntry[];
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-tight text-[var(--color-text-primary)]">
        {label}
      </h3>
      <ul className="space-y-4">
        {entries.map((entry, i) => (
          <li
            key={`${entry.name}-${i}`}
            className="rounded-xl border border-[rgba(31,29,27,0.08)] bg-[var(--color-surface)] p-4 md:p-5"
          >
            <p className="font-medium text-[var(--color-text-primary)]">
              {entry.name}
            </p>
            {entry.area ? (
              <p className="mt-1 text-xs tracking-wide text-[#A39B95]">
                {entry.area}
              </p>
            ) : null}
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {entry.note}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BackToCountriesLink({ className }: { className?: string }) {
  return (
    <Link
      href="/countries"
      className={
        className ??
        "inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-signature)]"
      }
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
  );
}

export function CountryGuideTemplate({ country, guide }: CountryGuideTemplateProps) {
  const comingSoon = country.isComingSoon;

  const guideMain = (
    <>
      <header id="overview" className="scroll-mt-32 space-y-8 md:space-y-10">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.16em] text-[#A39B95]">
            {country.region}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-5xl md:leading-[1.1]">
            {country.name}
          </h1>
          <CountryCityTags cities={country.cities} />
          <p className="max-w-3xl text-base leading-[1.75] text-[var(--color-text-muted)] md:text-lg md:leading-[1.8]">
            {country.shortDescription}
          </p>
        </div>

        <div className="relative aspect-[21/10] w-full overflow-hidden rounded-[1.35rem] border border-[rgba(31,29,27,0.08)] bg-[var(--color-accent-soft)] md:aspect-[21/9]">
          <Image
            src={country.heroImage}
            alt={`Photography for the ${country.name} guide`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 56rem, 100vw"
            priority
          />
        </div>
      </header>

      <div className="mt-16 space-y-20 md:mt-20 md:space-y-24">
        <section id="why-i-loved-it" className="scroll-mt-32">
          <GuideSectionTitle eyebrow="Quick take" title="Why I loved it" />
          <div className="max-w-3xl space-y-5 text-base leading-[1.8] text-[var(--color-text-muted)] md:text-[1.0625rem]">
            {guide.whyILovedIt.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        <section id="neighborhoods" className="scroll-mt-32">
          <GuideSectionTitle
            eyebrow="Areas"
            title="Neighborhoods & pockets worth knowing"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {guide.neighborhoods.map((n) => (
              <div
                key={n.name}
                className="rounded-2xl border border-[rgba(31,29,27,0.08)] bg-[#fcfaf8] p-6 md:p-7"
              >
                <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
                  {n.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {n.vibe}
                </p>
                <p className="mt-4 inline-flex rounded-full border border-[rgba(31,29,27,0.1)] bg-white/60 px-3 py-1 text-xs font-medium text-[#625B55]">
                  Best for · {n.bestFor}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="things-to-do" className="scroll-mt-32">
          <GuideSectionTitle eyebrow="Itinerary" title="Things to do" />
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-text-primary)]">
                Must do
              </h3>
              <BulletList items={guide.thingsToDo.mustDo} />
            </div>
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-text-primary)]">
                Worth it if…
              </h3>
              <BulletList items={guide.thingsToDo.worthItIf} />
            </div>
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-[#948c84]">
                Skip / lower priority
              </h3>
              <BulletList items={guide.thingsToDo.skipOrLower} />
            </div>
          </div>
        </section>

        <section id="food-drink" className="scroll-mt-32">
          <GuideSectionTitle eyebrow="Taste" title="Food & drink" />
          <div className="grid gap-12 md:gap-14 lg:grid-cols-2">
            <FoodBlock label="Coffee/Breakfast" entries={guide.foodDrink.coffee} />
            <FoodBlock
              label="Miscellaneous"
              entries={guide.foodDrink.casual}
            />
            <FoodBlock label="Dinner" entries={guide.foodDrink.dinner} />
            <FoodBlock
              label="Cocktails / wine"
              entries={guide.foodDrink.cocktailsWine}
            />
          </div>
        </section>

        <section id="shopping" className="scroll-mt-32">
          <GuideSectionTitle eyebrow="Browse" title="Shopping" />
          <div className="space-y-4">
            {guide.shopping.map((s) => (
              <div
                key={`${s.name}-${s.category}`}
                className="flex flex-col gap-2 rounded-xl border border-[rgba(31,29,27,0.08)] bg-[var(--color-surface)] px-5 py-4 md:flex-row md:items-start md:justify-between md:gap-8 md:py-5"
              >
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">
                    {s.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#A39B95]">
                    {s.category}
                  </p>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)] md:text-right">
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="logistics" className="scroll-mt-32">
          <GuideSectionTitle eyebrow="Practical" title="Logistics" />
          <dl className="grid gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
            {(
              [
                ["Getting around", guide.logistics.gettingAround],
                ["Airport notes", guide.logistics.airport],
                ["Transit", guide.logistics.transit],
                ["Cash & cards", guide.logistics.cashCard],
                ["General tips", guide.logistics.tips],
              ] as const
            ).map(([label, body]) => (
              <div key={label}>
                <dt className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                  {body}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="weather" className="scroll-mt-32">
          <GuideSectionTitle eyebrow="Seasons" title="Weather & best time to visit" />
          <div className="grid gap-6 md:grid-cols-3 md:gap-5">
            <div className="rounded-2xl border border-[rgba(31,29,27,0.08)] bg-[#fcfaf8] p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#A39B95]">
                Best months
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {guide.weather.bestMonths}
              </p>
            </div>
            <div className="rounded-2xl border border-[rgba(31,29,27,0.08)] bg-[#fcfaf8] p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#A39B95]">
                What to expect
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {guide.weather.whatToExpect}
              </p>
            </div>
            <div className="rounded-2xl border border-[rgba(31,29,27,0.08)] bg-[#fcfaf8] p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#A39B95]">
                What to avoid
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {guide.weather.whatToAvoid}
              </p>
            </div>
          </div>
        </section>

        <section id="packing" className="scroll-mt-32">
          <GuideSectionTitle eyebrow="Bag" title="Packing notes" />
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">
                Bring
              </h3>
              <BulletList items={guide.packing.bring} />
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">
                Wear
              </h3>
              <BulletList items={guide.packing.wear} />
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-[#948c84]">
                Skip / don’t overpack
              </h3>
              <BulletList items={guide.packing.skip} />
            </div>
          </div>
        </section>

        <section id="final-thoughts" className="scroll-mt-32 pb-4">
          <GuideSectionTitle eyebrow="Closing" title="Final thoughts" />
          <div className="max-w-3xl space-y-6 text-base leading-[1.85] text-[var(--color-text-muted)] md:text-[1.0625rem]">
            <p>{guide.finalThoughts.closing}</p>
            <p className="border-l-2 border-[rgba(31,29,27,0.12)] pl-5 text-[var(--color-text-primary)]">
              {guide.finalThoughts.whoItsFor}
            </p>
          </div>
        </section>
      </div>
    </>
  );

  return (
    <article className="mx-auto w-full max-w-5xl px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-20">
      <BackToCountriesLink className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-signature)] md:mb-10" />

      {!comingSoon ? <CountryGuideNav /> : null}

      {comingSoon ? (
        <div className="relative isolate">
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex justify-center px-4 pt-1 md:pt-2"
            aria-live="polite"
          >
            <div className="pointer-events-auto w-full max-w-md rounded-[1.35rem] border border-[rgba(31,29,27,0.1)] bg-[#fcfaf8] px-7 py-7 text-center shadow-[0_12px_40px_rgba(31,29,27,0.08)] md:px-8 md:py-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#A39B95]">
                Still writing
              </p>
              <h2 className="mt-2.5 text-xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-[1.35rem]">
                Guide coming soon
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                I&apos;ve been here — I just haven&apos;t written this one yet.
              </p>
              <Link
                href="/countries"
                className="mt-5 inline-flex text-sm font-medium text-[#625B55] underline decoration-[rgba(31,29,27,0.18)] underline-offset-4 transition-colors hover:text-[var(--color-signature)] hover:decoration-[var(--color-signature)]/40"
              >
                Check back later →
              </Link>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none select-none blur-[8px] opacity-[0.88] saturate-[0.92] [&_*]:select-none"
          >
            {guideMain}
          </div>
        </div>
      ) : (
        guideMain
      )}
    </article>
  );
}
