import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Country } from "@/lib/types";
import type { CountryGuideSections, FoodEntry } from "@/lib/country-guide-types";
import { CountryGuideNav } from "@/components/countries/country-guide-nav";
import { CountryCityTags } from "@/components/countries/country-city-tags";
import { GuideCarousel } from "@/components/countries/guide-carousel";
import type { GuideCarouselItem } from "@/components/countries/guide-carousel";
import {
  AirplaneMark,
  HeroFactIcon,
  MapLineMark,
  PassportStamp,
  SuitcaseMark,
  WeatherIcon,
} from "@/components/countries/guide-art";
import {
  getCountryPhotos,
  getHeroFacts,
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
    <header className="mb-8 flex items-start justify-between gap-6 md:mb-11">
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

function foodItems(guide: CountryGuideSections): GuideCarouselItem[] {
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

function shoppingItems(guide: CountryGuideSections): GuideCarouselItem[] {
  return guide.shopping.map((entry) => ({
    kicker: entry.category,
    title: entry.name,
    body: entry.note,
    image: entry.image,
  }));
}

function thingsToDoItems(guide: CountryGuideSections): GuideCarouselItem[] {
  return guide.thingsToDo.mustDo.map((item, i) => ({
    kicker: String(i + 1).padStart(2, "0"),
    title: item,
  }));
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
  const photos = getCountryPhotos(country);
  const heroPhoto = photos[0];
  const facts = getHeroFacts(country, guide);
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
          <ul className="mt-10 grid w-full grid-cols-2 gap-x-8 gap-y-6 sm:mt-12 lg:mt-14 lg:grid-cols-4 lg:gap-x-8">
            {facts.map((fact) => (
              <li key={fact.label} className="min-w-0">
                <span className="flex h-8 w-8 items-center text-[var(--color-text-primary)]">
                  <HeroFactIcon
                    icon={fact.icon}
                    className="h-[1.15rem] w-[1.15rem]"
                  />
                </span>
                <p className="mt-2.5 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-primary)]">
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

      <div className="mt-20 space-y-24 md:mt-28 md:space-y-32">
        <section id="why-i-loved-it" className="scroll-mt-24">
          <GuideSectionTitle eyebrow="Quick take" title="Why I loved it" />
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-1 -top-8 select-none font-display text-[6.5rem] leading-none text-[rgba(91,58,142,0.16)] md:-left-3 md:-top-10 md:text-[8rem]"
            >
              “
            </span>
            {whyLead ? (
              <p className="relative max-w-2xl border-l-2 border-[rgba(91,58,142,0.28)] pl-5 font-display text-[1.45rem] leading-[1.35] tracking-tight text-[var(--color-text-primary)] md:pl-7 md:text-[1.85rem] md:leading-[1.32]">
                {whyLead}
              </p>
            ) : null}
            {whyRest.length > 0 ? (
              <div className="mt-8 max-w-xl space-y-5 pl-0 text-base leading-[1.85] text-[var(--color-text-muted)] md:mt-10 md:pl-7 md:text-[1.0625rem]">
                {whyRest.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section id="neighborhoods" className="relative scroll-mt-24">
          <GuideSectionTitle
            eyebrow="Areas"
            title="Neighborhoods & pockets worth knowing"
          />
          <div className="relative">
            <MapLineMark className="pointer-events-none absolute -right-4 top-6 hidden h-52 w-16 text-[var(--color-signature)] opacity-35 md:block lg:right-0" />
            <ol className="divide-y divide-[rgba(31,29,27,0.08)] border-y border-[rgba(31,29,27,0.08)]">
              {guide.neighborhoods.map((n, i) => (
                <li
                  key={n.name}
                  className="grid gap-3 py-8 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-8 sm:py-10"
                >
                  <p className="font-mono text-xs tracking-[0.16em] text-[#A39B95]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div className="max-w-2xl">
                    <h3 className="font-display text-[1.45rem] leading-tight tracking-tight text-[var(--color-text-primary)] md:text-[1.65rem]">
                      {n.name}
                    </h3>
                    <p className="mt-3 text-[0.975rem] leading-[1.8] text-[var(--color-text-muted)]">
                      {n.vibe}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="things-to-do" className="scroll-mt-24">
          <GuideSectionTitle eyebrow="Itinerary" title="Things to do" />
          <GuideCarousel
            label="Things to do"
            variant="cover"
            items={thingsToDoItems(guide)}
          />
          <div className="mt-14 grid gap-10 border-t border-[rgba(31,29,27,0.08)] pt-10 md:mt-16 md:grid-cols-2 md:gap-16 md:pt-12">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#A39B95]">
                Worth it if…
              </p>
              <ul className="mt-5 space-y-4">
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
              <ul className="mt-5 space-y-4">
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
        </section>

        <section id="food-drink" className="scroll-mt-24">
          <GuideSectionTitle eyebrow="Taste" title="Food & drink" />
          <GuideCarousel
            label="Food and drink picks"
            variant="split"
            items={foodItems(guide)}
          />
        </section>

        <section id="shopping" className="scroll-mt-24">
          <GuideSectionTitle eyebrow="Browse" title="Shopping" />
          <GuideCarousel
            label="Shopping picks"
            variant="stack"
            items={shoppingItems(guide)}
          />
        </section>

        <section id="logistics" className="scroll-mt-24">
          <GuideSectionTitle eyebrow="Practical" title="Logistics" />
          <div className="overflow-hidden rounded-[1.5rem] bg-[#f1ebe4] px-6 py-8 md:px-10 md:py-11">
            <dl className="divide-y divide-[rgba(31,29,27,0.08)]">
              {LOGISTICS_NOTES.map(([label, key]) => (
                <div
                  key={label}
                  className="grid gap-3 py-7 first:pt-0 last:pb-0 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10"
                >
                  <dt className="text-sm font-medium tracking-tight text-[var(--color-text-primary)]">
                    {label}
                  </dt>
                  <dd className="text-[0.975rem] leading-[1.8] text-[var(--color-text-muted)]">
                    {guide.logistics[key]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="weather" className="scroll-mt-24">
          <GuideSectionTitle
            eyebrow="Seasons"
            title="Weather & best time to visit"
          />
          <p className="max-w-3xl font-display text-[1.55rem] leading-[1.3] tracking-tight text-[var(--color-text-primary)] md:text-[2rem] md:leading-[1.28]">
            {guide.weather.bestMonths}
          </p>
          <div className="mt-12 grid gap-10 border-t border-[rgba(31,29,27,0.08)] pt-10 md:grid-cols-3 md:gap-12">
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
        </section>

        <section id="packing" className="scroll-mt-24">
          <GuideSectionTitle
            eyebrow="Bag"
            title="Packing notes"
            accessory={
              <SuitcaseMark className="mt-3 hidden h-11 w-11 text-[var(--color-signature)] opacity-45 md:block" />
            }
          />
          <div className="space-y-10">
            <PackingGroup label="Bring" items={guide.packing.bring} tone="bring" />
            <PackingGroup label="Wear" items={guide.packing.wear} tone="wear" />
            <PackingGroup
              label="Skip / don’t overpack"
              items={guide.packing.skip}
              tone="skip"
            />
          </div>
        </section>

        <section id="final-thoughts" className="scroll-mt-24 pb-4">
          <GuideSectionTitle eyebrow="Closing" title="Final thoughts" />
          <p className="max-w-3xl font-display text-[1.45rem] leading-[1.35] text-[var(--color-text-primary)] md:text-[1.75rem] md:leading-[1.32]">
            {guide.finalThoughts.closing}
          </p>
          <div className="relative mt-10 max-w-2xl border-l-2 border-[rgba(91,58,142,0.3)] pl-6 md:mt-12 md:pl-8">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-7 select-none font-display text-[5.5rem] leading-none text-[rgba(91,58,142,0.14)]"
            >
              “
            </span>
            <p className="relative text-[1.05rem] leading-[1.8] text-[var(--color-text-muted)] md:text-[1.125rem]">
              {guide.finalThoughts.whoItsFor}
            </p>
          </div>
          {heroPhoto ? (
            <div className="relative mt-12 aspect-[21/9] w-full overflow-hidden rounded-[1.2rem] md:mt-14">
              <Image
                src={heroPhoto}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 56rem, 100vw"
              />
              <PassportStamp className="pointer-events-none absolute bottom-4 right-4 hidden h-14 w-14 text-white opacity-80 md:block" />
            </div>
          ) : null}
        </section>
      </div>
    </>
  );

  return (
    <article className="mx-auto w-full max-w-5xl px-6 pb-20 pt-14 md:px-10 md:pb-28 md:pt-16">
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
        className="h-5 w-5 text-[var(--color-signature)]"
      />
      <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#A39B95]">
        {label}
      </p>
      <p className="mt-3 text-[0.95rem] leading-[1.75] text-[var(--color-text-muted)]">
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
            className={`rounded-full border px-3.5 py-2 text-sm leading-snug ${pillClass}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
