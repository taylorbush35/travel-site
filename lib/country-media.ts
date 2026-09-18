import type { Country } from "@/lib/types";
import type { CountryGuideSections } from "@/lib/country-guide-types";

export function hasPhotographicAsset(src: string): boolean {
  return /\.(jpe?g|png|webp)(\?|$)/i.test(src);
}

export function getCountryPhotos(country: Country): string[] {
  const seen = new Set<string>();
  const photos: string[] = [];
  for (const src of [
    country.heroImage,
    country.cardImage,
    ...(country.galleryImages ?? []),
  ]) {
    if (!hasPhotographicAsset(src) || seen.has(src)) continue;
    seen.add(src);
    photos.push(src);
  }
  return photos;
}

export function getGuidePhotography(country: Country) {
  const photos = getCountryPhotos(country);
  return {
    photos,
    hero: photos[0],
    neighborhood: photos[1] ?? photos[0],
    closing: photos.length > 1 ? photos[photos.length - 1] : photos[0],
  };
}

export function photosForCount(
  photos: string[],
  count: number,
): Array<string | undefined> {
  return Array.from({ length: count }, (_, i) => photos[i]);
}

export function splitLeadSentence(text: string): { lead: string; rest: string } {
  const trimmed = text.trim();
  const match = trimmed.match(/^(.+?[.!?])(?:\s+([\s\S]*))?$/);
  if (!match) return { lead: trimmed, rest: "" };
  return { lead: match[1], rest: (match[2] ?? "").trim() };
}

export type HeroFact = {
  icon: "calendar" | "climate" | "transit" | "pin";
  label: string;
  detail: string;
};

export function excerptForFact(text: string, max = 100): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  const sentence = trimmed.match(/^[^.!?]+[.!?]?/)?.[0]?.trim() ?? trimmed;
  if (sentence.length <= max) return sentence.replace(/[.]+$/, "");
  const slice = sentence.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  return (lastSpace > 36 ? slice.slice(0, lastSpace) : slice).replace(
    /[.,;:]+$/,
    "",
  );
}

export function getHeroFacts(
  country: Country,
  guide: CountryGuideSections,
): HeroFact[] {
  const facts: HeroFact[] = [];

  if (guide.weather.bestMonths) {
    facts.push({
      icon: "calendar",
      label: "Best time",
      detail: excerptForFact(guide.weather.bestMonths),
    });
  }

  if (guide.weather.whatToExpect) {
    facts.push({
      icon: "climate",
      label: "Climate",
      detail: excerptForFact(guide.weather.whatToExpect),
    });
  }

  const around = guide.logistics.gettingAround || guide.logistics.transit;
  if (around) {
    facts.push({
      icon: "transit",
      label: "Getting around",
      detail: excerptForFact(around),
    });
  }

  if (country.cities.length > 0) {
    facts.push({
      icon: "pin",
      label: country.cities.length === 1 ? "Base" : "Bases",
      detail: country.cities.join(" · "),
    });
  }

  return facts.slice(0, 4);
}

export function weatherGlyph(
  text: string,
): "sun" | "cloud" | "rain" | "snow" | "wind" {
  const t = text.toLowerCase();
  if (/(snow|ice|frost)/.test(t)) return "snow";
  if (/(rain|storm|typhoon|humid)/.test(t)) return "rain";
  if (/(wind|breeze|waterfront)/.test(t)) return "wind";
  if (/(sun|hot|heat|summer|spring|light)/.test(t)) return "sun";
  return "cloud";
}
