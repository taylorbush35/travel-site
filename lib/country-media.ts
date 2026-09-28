import type { Country } from "@/lib/types";

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
    /** Small editorial accent only — omitted when there isn't a distinct third photo. */
    activityAccent: photos.length > 2 ? photos[2] : undefined,
  };
}

export function photosForCount(
  photos: string[],
  count: number,
): Array<string | undefined> {
  return Array.from({ length: count }, (_, i) => photos[i]);
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
