import { Country } from "@/lib/types";

export const countries: Country[] = [
  {
    slug: "japan",
    name: "Japan",
    region: "Asia",
    heroImage: "/globe.svg",
    cardImage: "/globe.svg",
    travelStyles: ["solo", "couple"],
    shortDescription:
      "A balance of calm temples, fast cities, and deeply thoughtful design.",
    highlights: [
      "Wander Tokyo's neighborhoods from sunrise coffee to late-night ramen.",
      "See Kyoto's shrines, gardens, and small streets at a slower pace.",
      "Take a countryside train ride for mountain views and quiet hot springs.",
    ],
    featured: true,
  },
  {
    slug: "portugal",
    name: "Portugal",
    region: "Europe",
    heroImage: "/window.svg",
    cardImage: "/window.svg",
    travelStyles: ["solo", "couple", "group"],
    shortDescription:
      "Coastal light, historic cities, and relaxed food-forward travel days.",
    highlights: [
      "Explore Lisbon's layered neighborhoods and scenic viewpoints.",
      "Spend time in Porto along the river with cafes and tiled facades.",
      "Drive part of the coast for beaches, cliffs, and laid-back towns.",
    ],
    featured: true,
  },
  {
    slug: "morocco",
    name: "Morocco",
    region: "Africa",
    heroImage: "/file.svg",
    cardImage: "/file.svg",
    travelStyles: ["couple", "group"],
    shortDescription:
      "Color, craft, and sensory contrast from medinas to desert landscapes.",
    highlights: [
      "Get lost in Marrakech's medina and artisan markets.",
      "Visit mountain villages and valleys for a slower rhythm.",
      "Plan one night in the desert for stargazing and sunrise silence.",
    ],
    featured: false,
  },
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    heroImage: "/next.svg",
    cardImage: "/next.svg",
    travelStyles: ["solo", "group"],
    shortDescription:
      "Wide-open nature, polished cities, and easy itineraries for every pace.",
    highlights: [
      "Mix city days in Vancouver or Montreal with nearby outdoor escapes.",
      "Road trip through national parks for lakes, forests, and scenic drives.",
      "Use rail and regional flights to connect major stops efficiently.",
    ],
    featured: true,
  },
];

export function getAllCountries(): Country[] {
  return countries;
}

export function getFeaturedCountries(): Country[] {
  return countries.filter((country) => country.featured);
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((country) => country.slug === slug);
}
