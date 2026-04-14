export type TravelStyle = "solo" | "couple" | "group";

export type Country = {
  slug: string;
  name: string;
  region: string;
  heroImage: string;
  cardImage: string;
  travelStyles: TravelStyle[];
  shortDescription: string;
  highlights: string[];
  featured: boolean;
};
