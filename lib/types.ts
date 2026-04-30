export type TravelStyle = "solo" | "couple" | "group";

export type Country = {
  slug: string;
  /** Country (or territory) — main title */
  name: string;
  /** Broad area for small labels (e.g. continent) */
  region: string;
  /** Cities and places explored — shown as tags under the title */
  cities: string[];
  heroImage: string;
  cardImage: string;
  travelStyles: TravelStyle[];
  shortDescription: string;
  highlights: string[];
  featured: boolean;
};
