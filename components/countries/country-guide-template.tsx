import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Country } from "@/lib/types";
import type { CountryGuideSections, FoodEntry } from "@/lib/country-guide-types";
import { CountryGuideNav } from "@/components/countries/country-guide-nav";
import { CountryCityTags } from "@/components/countries/country-city-tags";
import { GuideCarousel } from "@/components/countries/guide-carousel";
import { ActivityJournalList } from "@/components/countries/activity-journal-list";
import { ShoppingBoard } from "@/components/countries/shopping-board";
import {
  AirplaneMark,
  HandNote,
  PassportStamp,
  SuitcaseMark,
  WeatherIcon,
} from "@/components/countries/guide-art";
import { getGuidePhotography, weatherGlyph } from "@/lib/country-media";

type CountryGuideTemplateProps = {
  country: Country;
  guide: CountryGuideSections;
};

function GuideSectionTitle({
  eyebrow,
  title,
  accessory,
}: {
  eyebrow?: string;
  title: string;
  accessory?: ReactNode;
}) {
  return (
    <header className="mb-8 flex items-start justify-between gap-6 md:mb-10">
      <div>
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#A39B95]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 font-display text-[1.9rem] leading-[1.15] tracking-tight text-[var(--color-text-primary)] md:text-[2.25rem]">
          {title}
        </h2>
      </div>
      {accessory}
    </header>
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

function foodItems(guide: CountryGuideSections) {
  const groups: Array<[string, FoodEntry[]]> = [
    ["Coffee/Breakfast", guide.foodDrink.coffee],
    ["Miscellaneous", guide.foodDrink.casual],
    ["Dinner", guide.foodDrink.dinner],
    ["Cocktails / wine", guide.foodDrink.cocktailsWine],
  ];

  return groups.flatMap(([kicker, entries]) =>
    entries.map((entry) => ({
      kicker,
      title: entry.name,
      meta: entry.area,
      body: entry.note,
      image: entry.image,
    })),
  );
}

/** The ONE secondary warm surface, applied as a full-bleed tint. No other tinted variants. */
function GuideSection({
  id,
  tint = false,
  lead = false,
  children,
}: {
  id: string;
  tint?: boolean;
  lead?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={[
        "relative scroll-mt-24 pb-10 md:pb-12 lg:pb-14",
        lead ? "pt-20" : "pt-10 md:pt-12 lg:pt-14",
      ].join(" ")}
    >
      {tint ? (
        <div
          className="pointer-events-none absolute inset-y-0 -left-6 -right-6 -z-10 bg-[var(--color-guide-surface)] md:-left-10 md:-right-10"
          aria-hidden
        />
      ) : null}
      {children}
    </section>
  );
}

const LOGISTICS_NOTES = [
  ["Getting around", "gettingAround"],
  ["Airport", "airport"],
  ["Transit", "transit"],
  ["Cash & cards", "cashCard"],
  ["General tips", "tips"],
] as const;

export function CountryGuideTemplate({
  country,
  guide,
}: CountryGuideTemplateProps) {
  const comingSoon = country.isComingSoon;
  const whyParagraphs = guide.whyILovedIt.split("\n\n");
  const [whyLead, ...whyRest] = whyParagraphs;
  const photos = getGuidePhotography(country);
  const heroPhoto = photos.hero;
  const neighborhoodPhoto = photos.neighborhood;
  const annotationCities = country.cities.slice(0, 3);

  const guideMain = (
    <>
      <header id="overview" className="scroll-mt-24">
        <div
          className={[
            "grid items-start gap-10",
            heroPhoto
              ? "lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.85fr)] lg:gap-12 xl:gap-16"
              : "",
          ].join(" ")}
        >
          <div className="min-w-0">
            <BackToCountriesLink />
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-[#A39B95]">
              {country.region}
            </p>
            <h1 className="mt-3 font-display text-[3.15rem] leading-[0.98] tracking-tight text-[var(--color-text-primary)] md:text-[4.15rem] lg:text-[4.4rem]">
              {country.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.8] text-[var(--color-text-muted)] md:text-[1.0625rem] md:leading-[1.85]">
              {country.shortDescription}
            </p>
            <div className="mt-5">
              <CountryCityTags cities={country.cities} />
            </div>
          </div>

          {heroPhoto ? (
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.2rem] bg-[var(--color-guide-surface)]">
                <Image
                  src={heroPhoto}
                  alt={`Photography for the ${country.name} guide`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 24rem, 90vw"
                  priority
                />
              </div>
              <svg
                className="pointer-events-none absolute -left-10 top-[18%] hidden h-24 w-28 text-[var(--color-signature)] opacity-50 lg:block"
                viewBox="0 0 112 96"
                fill="none"
                aria-hidden
              >
                <path
                  d="M 4 70 C 28 40, 48 78, 78 36 C 92 18, 102 28, 110 22"
                  stroke="currentColor"
                  strokeWidth="1.15"
                  strokeDasharray="2 5"
                  strokeLinecap="round"
                />
              </svg>
              <AirplaneMark className="pointer-events-none absolute -left-3 top-[12%] hidden h-7 w-7 rotate-[-18deg] text-[var(--color-signature)] opacity-70 lg:block" />
              {annotationCities.length > 0 ? (
                <p
                  className="pointer-events-none mt-3 hidden text-right font-hand text-[1.3rem] leading-[1.15] text-[var(--color-signature)] md:block lg:absolute lg:bottom-10 lg:right-[calc(100%+0.85rem)] lg:mt-0 lg:whitespace-nowrap"
                  aria-hidden
                >
                  {annotationCities.map((city, i) => (
                    <span key={city} className="block">
                      {city}
                      {i === annotationCities.length - 1 ? " ♡" : ""}
                    </span>
                  ))}
                </p>
              ) : null}
              <PassportStamp className="pointer-events-none absolute -bottom-6 -left-5 hidden h-16 w-16 rotate-[-12deg] text-[var(--color-signature)] opacity-40 md:block" />
            </div>
          ) : null}
        </div>
      </header>

      <div>
        {/* Large statement — the pull quote sets the personal tone */}
        <GuideSection id="why-i-loved-it" lead>
          <GuideSectionTitle eyebrow="Quick take" title="Why I loved it" />
          <div className="relative max-w-3xl">
            {whyLead ? (
              <>
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-1 -top-8 select-none font-display text-[6.5rem] leading-none text-[rgba(91,58,142,0.16)] md:-left-3 md:-top-10 md:text-[8rem]"
                >
                  “
                </span>
                <p className="relative border-l-2 border-[rgba(91,58,142,0.28)] pl-5 font-display text-[1.45rem] leading-[1.35] tracking-tight text-[var(--color-text-primary)] md:pl-7 md:text-[1.85rem] md:leading-[1.32]">
                  {whyLead}
                </p>
              </>
            ) : null}
            {whyRest.length > 0 ? (
              <div className="mt-6 max-w-xl space-y-3 text-[0.975rem] leading-[1.7] text-[var(--color-text-muted)] md:mt-7">
                {whyRest.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : null}
          </div>
        </GuideSection>

        {/* Editorial list + one sticky photo, on the unified warm surface */}
        <GuideSection id="neighborhoods" tint>
          <GuideSectionTitle
            eyebrow="Areas"
            title="Neighborhoods & pockets worth knowing"
          />
          <div
            className={
              neighborhoodPhoto
                ? "grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(15rem,0.72fr)] lg:gap-14 xl:gap-16"
                : "relative"
            }
          >
            <ol className="divide-y divide-[rgba(31,29,27,0.1)]">
              {guide.neighborhoods.map((n, i) => (
                <li
                  key={n.name}
                  className="grid gap-1.5 py-5 first:pt-0 last:pb-0 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6 sm:py-6"
                >
                  <p className="font-display text-[1.6rem] leading-none tracking-tight text-[rgba(91,58,142,0.4)] sm:text-[1.85rem]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="font-display text-[1.4rem] leading-tight tracking-tight text-[var(--color-text-primary)] md:text-[1.55rem]">
                      {n.name}
                    </h3>
                    <p className="mt-1.5 text-[0.925rem] leading-[1.55] text-[var(--color-text-muted)]">
                      {n.vibe}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            {neighborhoodPhoto ? (
              <aside className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:mx-0 lg:max-w-none">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.15rem] bg-[var(--color-guide-surface)]">
                  <Image
                    src={neighborhoodPhoto}
                    alt={`A neighborhood view from ${country.name}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 22rem, 90vw"
                  />
                </div>
                {country.cities[0] ? (
                  <p
                    className="pointer-events-none mt-3 text-right font-hand text-[1.25rem] leading-none text-[var(--color-signature)] lg:absolute lg:-bottom-1 lg:-right-2 lg:mt-0"
                    aria-hidden
                  >
                    {country.cities[0]}
                  </p>
                ) : null}
              </aside>
            ) : null}
          </div>
        </GuideSection>

        {/* Whitespace + typography-only rhythm break — big numbers, no photography */}
        <GuideSection id="things-to-do">
          <GuideSectionTitle
            eyebrow="Itinerary"
            title="Things to do"
            accessory={
              <HandNote className="hidden -rotate-2 sm:block">
                the move
              </HandNote>
            }
          />
          <ActivityJournalList
            items={guide.thingsToDo.mustDo}
            accentPhoto={photos.activityAccent}
            countryName={country.name}
          />
        </GuideSection>

        {/* Image-led moment — photo + short caption, on the unified warm surface */}
        <GuideSection id="food-drink" tint>
          <GuideSectionTitle
            eyebrow="Taste"
            title="Food & drink"
            accessory={
              <HandNote className="hidden -rotate-2 sm:block">
                favorites
              </HandNote>
            }
          />
          <GuideCarousel
            label="Food and drink picks"
            variant="peek"
            items={foodItems(guide)}
          />
        </GuideSection>

        {/* Quiet, plain-background list — deliberately not another carousel */}
        <GuideSection id="shopping">
          <GuideSectionTitle eyebrow="Browse" title="Shopping" />
          <ShoppingBoard items={guide.shopping} />
        </GuideSection>

        {/* "Things I wish I knew" — compact rows + one highlighted warning */}
        <GuideSection id="logistics" tint>
          <GuideSectionTitle eyebrow="Practical" title="Things I wish I knew" />
          <dl className="divide-y divide-[rgba(31,29,27,0.1)]">
            {LOGISTICS_NOTES.map(([label, key]) => (
              <div
                key={label}
                className="grid gap-1.5 py-4 first:pt-0 last:pb-0 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-baseline sm:gap-8"
              >
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-signature-ink)]">
                  {label}
                </dt>
                <dd className="text-[0.975rem] leading-[1.6] text-[var(--color-text-primary)]">
                  {guide.logistics[key]}
                </dd>
              </div>
            ))}
          </dl>
          {guide.logistics.warning ? (
            <div className="relative mt-7 rounded-[0.9rem] border border-[rgba(91,58,142,0.22)] bg-[var(--color-surface)] px-5 py-5 md:px-6 md:py-6">
              <HandNote className="-rotate-1 text-[1.15rem]">
                I learned this the hard way
              </HandNote>
              <p className="mt-2.5 text-[0.975rem] leading-[1.6] text-[var(--color-text-primary)]">
                {guide.logistics.warning}
              </p>
            </div>
          ) : null}
        </GuideSection>

        {/* Extremely scannable — one statement, three columns, done */}
        <GuideSection id="weather">
          <GuideSectionTitle
            eyebrow="Seasons"
            title="Weather & best time to visit"
          />
          <p className="max-w-3xl font-display text-[1.45rem] leading-[1.3] tracking-tight text-[var(--color-text-primary)] md:text-[1.85rem] md:leading-[1.28]">
            {guide.weather.bestMonths}
            <HandNote className="ml-3 hidden -rotate-2 align-middle text-[1.1rem] md:inline-block">
              trust me
            </HandNote>
          </p>
          <div className="mt-8 grid gap-8 border-t border-[rgba(31,29,27,0.08)] pt-8 md:mt-9 md:grid-cols-3 md:gap-10 md:pt-8">
            <WeatherFact
              label="Best months"
              text={guide.weather.bestMonths}
              glyph={weatherGlyph(guide.weather.bestMonths)}
            />
            <WeatherFact
              label="What to expect"
              text={guide.weather.whatToExpect}
              glyph={weatherGlyph(guide.weather.whatToExpect)}
            />
            <WeatherFact
              label="What to avoid"
              text={guide.weather.whatToAvoid}
              glyph={weatherGlyph(guide.weather.whatToAvoid)}
            />
          </div>
        </GuideSection>

        {/* Playful close — tightened pills, breaks the rhythm on purpose */}
        <GuideSection id="packing">
          <GuideSectionTitle
            eyebrow="Bag"
            title="Packing notes"
            accessory={
              <SuitcaseMark className="mt-3 hidden h-9 w-9 text-[var(--color-signature)] opacity-45 md:block" />
            }
          />
          <div className="space-y-5">
            <PackingGroup label="Bring" items={guide.packing.bring} tone="bring" />
            <PackingGroup label="Wear" items={guide.packing.wear} tone="wear" />
            <PackingGroup
              label="Skip"
              items={guide.packing.skip}
              tone="skip"
            />
          </div>
        </GuideSection>
      </div>
    </>
  );

  return (
    <article className="mx-auto w-full max-w-5xl px-6 pb-16 pt-14 md:px-10 md:pb-24 md:pt-16">
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
              <h2 className="mt-2.5 font-display text-xl tracking-tight text-[var(--color-text-primary)] md:text-[1.45rem]">
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

function WeatherFact({
  label,
  text,
  glyph,
}: {
  label: string;
  text: string;
  glyph: "sun" | "cloud" | "rain" | "snow" | "wind";
}) {
  return (
    <div>
      <WeatherIcon
        kind={glyph}
        className="h-[1.15rem] w-[1.15rem] text-[var(--color-signature)]"
      />
      <p className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#A39B95]">
        {label}
      </p>
      <p className="mt-2.5 text-[0.95rem] leading-[1.7] text-[var(--color-text-muted)]">
        {text}
      </p>
    </div>
  );
}

function PackingGroup({
  label,
  items,
  tone,
}: {
  label: string;
  items: string[];
  tone: "bring" | "wear" | "skip";
}) {
  const pillClass =
    tone === "bring"
      ? "border-[rgba(91,58,142,0.28)] bg-[var(--color-signature-soft)]/70 text-[var(--color-signature-ink)]"
      : tone === "wear"
        ? "border-[rgba(31,29,27,0.12)] bg-[var(--color-surface)] text-[var(--color-text-primary)]"
        : "border-[rgba(31,29,27,0.1)] bg-[var(--color-guide-surface)] text-[#8a827a]";

  return (
    <div>
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#A39B95]">
        {label}
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className={`rounded-full border px-3 py-1 text-[13px] leading-snug ${pillClass}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
