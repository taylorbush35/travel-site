import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Country } from "@/lib/types";
import type { CountryGuideSections, FoodEntry } from "@/lib/country-guide-types";
import { CountryGuideNav } from "@/components/countries/country-guide-nav";
import { CountryCityTags } from "@/components/countries/country-city-tags";
import { GuideCarousel } from "@/components/countries/guide-carousel";
import { ActivityFeatureGrid } from "@/components/countries/activity-feature-grid";
import { ShoppingBoard } from "@/components/countries/shopping-board";
import {
  AirplaneMark,
  HeroFactIcon,
  PassportStamp,
  SuitcaseMark,
  WeatherIcon,
} from "@/components/countries/guide-art";
import {
  getGuidePhotography,
  getHeroFacts,
  splitLeadSentence,
  weatherGlyph,
} from "@/lib/country-media";

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

function GuideSection({
  id,
  wash,
  children,
}: {
  id: string;
  wash?: "cream" | "lavender" | "warm";
  children: ReactNode;
}) {
  const washClass =
    wash === "cream"
      ? "bg-[var(--color-guide-cream)]/80"
      : wash === "lavender"
        ? "bg-[rgba(91,58,142,0.035)]"
        : wash === "warm"
          ? "bg-[var(--color-guide-warm)]/75"
          : "";

  return (
    <section id={id} className="relative scroll-mt-24 py-10 md:py-12 lg:py-14">
      {washClass ? (
        <div
          className={`pointer-events-none absolute inset-y-0 -left-6 -right-6 -z-10 md:-left-10 md:-right-10 ${washClass}`}
          aria-hidden
        />
      ) : null}
      {children}
    </section>
  );
}

const LOGISTICS_NOTES = [
  ["Getting around", "gettingAround"],
  ["Airport notes", "airport"],
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
  const closingPhoto = photos.closing;
  const facts = getHeroFacts(country, guide);
  const annotationCities = country.cities.slice(0, 3);
  const closingCopy = splitLeadSentence(guide.finalThoughts.closing);

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
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.2rem] bg-[#e8e0d6]">
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
                  className="pointer-events-none mt-3 hidden text-right font-hand text-[1.3rem] leading-[1.15] text-[var(--color-signature)] md:block lg:absolute lg:-bottom-2 lg:-right-3 lg:mt-0 lg:max-w-[8.5rem]"
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

        {facts.length > 0 ? (
          <ul className="mt-10 grid w-full grid-cols-2 gap-x-8 gap-y-6 sm:mt-12 lg:mt-14 lg:grid-cols-4 lg:gap-x-10">
            {facts.map((fact) => (
              <li key={fact.label} className="min-w-0">
                <span className="flex h-8 w-8 items-center text-[var(--color-text-primary)]">
                  <HeroFactIcon
                    icon={fact.icon}
                    className="h-[1.15rem] w-[1.15rem]"
                  />
                </span>
                <p className="mt-2.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-primary)]">
                  {fact.label}
                </p>
                <p className="mt-1 text-[13px] leading-snug text-[#8a827a]">
                  {fact.detail}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="mt-16 md:mt-20">
        <GuideSection id="why-i-loved-it">
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
              <div className="mt-8 max-w-xl space-y-5 text-base leading-[1.85] text-[var(--color-text-muted)] md:mt-10 md:text-[1.0625rem]">
                {whyRest.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : null}
          </div>
        </GuideSection>

        <GuideSection id="neighborhoods" wash="cream">
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
            <ol className="divide-y divide-[rgba(31,29,27,0.08)] border-y border-[rgba(31,29,27,0.08)]">
              {guide.neighborhoods.map((n, i) => (
                <li
                  key={n.name}
                  className="grid gap-2 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-6 sm:py-7"
                >
                  <p className="font-mono text-xs tracking-[0.16em] text-[#A39B95]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="font-display text-[1.45rem] leading-tight tracking-tight text-[var(--color-text-primary)] md:text-[1.65rem]">
                      {n.name}
                    </h3>
                    <p className="mt-2.5 text-[0.975rem] leading-[1.8] text-[var(--color-text-muted)]">
                      {n.vibe}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            {neighborhoodPhoto ? (
              <aside className="relative mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:mx-0 lg:max-w-none">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.15rem] bg-[#e8e0d6]">
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

        <GuideSection id="things-to-do">
          <GuideSectionTitle eyebrow="Itinerary" title="Things to do" />
          <ActivityFeatureGrid
            items={guide.thingsToDo.mustDo}
            photos={photos.photos}
            countryName={country.name}
          />
          <div className="mt-10 grid gap-8 border-t border-[rgba(31,29,27,0.08)] pt-8 md:mt-12 md:grid-cols-2 md:gap-14 md:pt-10">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#A39B95]">
                Worth it if…
              </p>
              <ul className="mt-4 space-y-3">
                {guide.thingsToDo.worthItIf.map((item, i) => (
                  <li
                    key={`${i}-${item.slice(0, 24)}`}
                    className="text-sm leading-7 text-[var(--color-text-muted)] md:text-[0.9375rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#A39B95]">
                Skip / lower priority
              </p>
              <ul className="mt-4 space-y-3">
                {guide.thingsToDo.skipOrLower.map((item, i) => (
                  <li
                    key={`${i}-${item.slice(0, 24)}`}
                    className="text-sm leading-7 text-[#8a827a] md:text-[0.9375rem]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GuideSection>

        <GuideSection id="food-drink" wash="lavender">
          <GuideSectionTitle eyebrow="Taste" title="Food & drink" />
          <GuideCarousel
            label="Food and drink picks"
            variant="peek"
            items={foodItems(guide)}
          />
        </GuideSection>

        <GuideSection id="shopping">
          <GuideSectionTitle eyebrow="Browse" title="Shopping" />
          <ShoppingBoard items={guide.shopping} />
        </GuideSection>

        <GuideSection id="logistics">
          <GuideSectionTitle eyebrow="Practical" title="Logistics" />
          <div className="overflow-hidden rounded-[1.25rem] bg-[#f1ebe4] px-5 py-6 md:px-8 md:py-8">
            <dl className="divide-y divide-[rgba(31,29,27,0.08)]">
              {LOGISTICS_NOTES.map(([label, key]) => (
                <div
                  key={label}
                  className="grid gap-2 py-5 first:pt-0 last:pb-0 md:grid-cols-[10.5rem_minmax(0,1fr)] md:gap-8 md:py-6"
                >
                  <dt className="text-sm font-medium tracking-tight text-[var(--color-text-primary)]">
                    {label}
                  </dt>
                  <dd className="text-[0.975rem] leading-[1.75] text-[var(--color-text-muted)]">
                    {guide.logistics[key]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </GuideSection>

        <GuideSection id="weather">
          <GuideSectionTitle
            eyebrow="Seasons"
            title="Weather & best time to visit"
          />
          <p className="max-w-3xl font-display text-[1.45rem] leading-[1.3] tracking-tight text-[var(--color-text-primary)] md:text-[1.85rem] md:leading-[1.28]">
            {guide.weather.bestMonths}
          </p>
          <div className="mt-8 grid gap-8 border-t border-[rgba(31,29,27,0.08)] pt-8 md:mt-10 md:grid-cols-3 md:gap-10 md:pt-9">
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

        <GuideSection id="packing">
          <GuideSectionTitle
            eyebrow="Bag"
            title="Packing notes"
            accessory={
              <SuitcaseMark className="mt-3 hidden h-10 w-10 text-[var(--color-signature)] opacity-45 md:block" />
            }
          />
          <div className="space-y-7">
            <PackingGroup label="Bring" items={guide.packing.bring} tone="bring" />
            <PackingGroup label="Wear" items={guide.packing.wear} tone="wear" />
            <PackingGroup
              label="Skip / don’t overpack"
              items={guide.packing.skip}
              tone="skip"
            />
          </div>
        </GuideSection>

        <GuideSection id="final-thoughts" wash="warm">
          <GuideSectionTitle eyebrow="Closing" title="Final thoughts" />
          <div
            className={
              closingPhoto
                ? "grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(16rem,0.95fr)] lg:gap-12"
                : ""
            }
          >
            <div>
              <p className="max-w-2xl font-display text-[1.45rem] leading-[1.32] text-[var(--color-text-primary)] md:text-[1.75rem] md:leading-[1.3]">
                {closingCopy.lead}
              </p>
              {closingCopy.rest ? (
                <p className="mt-5 max-w-xl text-[1.02rem] leading-[1.8] text-[var(--color-text-muted)]">
                  {closingCopy.rest}
                </p>
              ) : null}
              <div className="relative mt-8 max-w-xl border-l-2 border-[rgba(91,58,142,0.3)] pl-5 md:pl-6">
                <p className="text-[1.02rem] leading-[1.8] text-[var(--color-text-muted)]">
                  {guide.finalThoughts.whoItsFor}
                </p>
              </div>
            </div>
            {closingPhoto ? (
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.15rem] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src={closingPhoto}
                  alt={`A last look at ${country.name}`}
                  fill
                  className="object-cover object-[center_40%]"
                  sizes="(min-width: 1024px) 24rem, 100vw"
                />
              </div>
            ) : null}
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
        : "border-[rgba(31,29,27,0.1)] bg-[#efeae4] text-[#8a827a]";

  return (
    <div>
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em] text-[#A39B95]">
        {label}
      </p>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className={`rounded-full border px-3 py-1.5 text-[13px] leading-snug ${pillClass}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
