import { Country } from "@/lib/types";

const images = ["/globe.svg", "/window.svg", "/file.svg", "/next.svg"] as const;

function pickImage(index: number): { heroImage: string; cardImage: string } {
  const src = images[index % images.length];
  return { heroImage: src, cardImage: src };
}

export const countries: Country[] = [
  {
    slug: "vietnam",
    name: "Vietnam",
    region: "Asia",
    cities: ["Da Nang", "Ho Chi Minh City", "Hoi An"],
    ...pickImage(0),
    travelStyles: ["solo", "couple", "group"],
    shortDescription:
      "Coast to megacity: beaches, lanterns, and some of the best street food in one trip.",
    highlights: [
      "Use domestic flights or trains to connect long north–south hops.",
      "Cash and Grab work everywhere; keep small bills for markets.",
      "Balance two bases with day trips instead of packing the whole map.",
    ],
    featured: true,
  },
  {
    slug: "italy",
    name: "Italy",
    region: "Europe",
    cities: ["Rome", "Florence", "Cinque Terre"],
    ...pickImage(1),
    travelStyles: ["solo", "couple", "group"],
    shortDescription:
      "Ancient capital, Renaissance streets, and cliffside villages along the Ligurian coast.",
    highlights: [
      "Book trains between cities; high-speed lines save daylight hours.",
      "Major museums sell out — reserve timed tickets before you land.",
      "Pack layers: churches and shoulder seasons can feel cool indoors.",
    ],
    featured: true,
  },
  {
    slug: "spain",
    name: "Spain",
    region: "Europe",
    cities: ["Barcelona"],
    ...pickImage(2),
    travelStyles: ["solo", "couple", "group"],
    shortDescription:
      "Gaudí, Gothic lanes, and beach-town energy in one compact Catalan base.",
    highlights: [
      "Spread Gaudí sites across two days so you are not sprinting.",
      "Watch bags on the metro and in busy squares.",
      "Add a day trip to Montserrat or the coast if you want contrast.",
    ],
    featured: true,
  },
  {
    slug: "france",
    name: "France",
    region: "Europe",
    cities: ["Nice"],
    ...pickImage(3),
    travelStyles: ["solo", "couple"],
    shortDescription:
      "Promenade walks, pebble beaches, and an easy hub for the French Riviera.",
    highlights: [
      "Nice is ideal on foot; use trains for Antibes, Monaco, or hill towns.",
      "Markets are best before noon for produce and people-watching.",
      "Beach clubs charge for loungers — bring a towel for public stretches.",
    ],
    featured: true,
  },
  {
    slug: "england",
    name: "England",
    region: "Europe",
    cities: ["London", "Oxford"],
    ...pickImage(0),
    travelStyles: ["solo", "couple", "group"],
    shortDescription:
      "Capital museums and theatre, then spires and quads in a day-trip university town.",
    highlights: [
      "Oyster cards or contactless tap cover most Tube and bus rides.",
      "Oxford is an easy train from London — book return off-peak when you can.",
      "Queue culture is real; build buffer time at popular free museums.",
    ],
    featured: false,
  },
  {
    slug: "ireland",
    name: "Ireland",
    region: "Europe",
    cities: ["Dublin", "Galway"],
    ...pickImage(1),
    travelStyles: ["solo", "couple"],
    shortDescription:
      "Literary pubs and Georgian squares on the east, Atlantic charm and music on the west.",
    highlights: [
      "Rent a car for the west if you leave Dublin — drive on the left.",
      "Weather shifts fast; pack a shell even in summer.",
      "Pub sessions start late; plan dinners accordingly.",
    ],
    featured: false,
  },
  {
    slug: "scotland",
    name: "Scotland",
    region: "Europe",
    cities: ["Edinburgh", "The Highlands"],
    ...pickImage(2),
    travelStyles: ["solo", "couple", "group"],
    shortDescription:
      "Castle rock and festival energy in the capital, then lochs and single-track roads north.",
    highlights: [
      "August is peak festival season in Edinburgh — book beds early.",
      "Highland driving is slower than maps suggest; plan fewer miles per day.",
      "Midges appear in damp summer evenings — repellent helps.",
    ],
    featured: false,
  },
  {
    slug: "denmark",
    name: "Denmark",
    region: "Europe",
    cities: ["Copenhagen"],
    ...pickImage(3),
    travelStyles: ["solo", "couple"],
    shortDescription:
      "Bikes, design shops, harbour swims, and hygge in a walkable Scandinavian capital.",
    highlights: [
      "Rent a bike or use the metro; the centre is flatter than it looks on a map.",
      "Many museums close Monday — check hours before you plan a day.",
      "Day-trip to Helsingør or Malmö if you want a change of scene.",
    ],
    featured: false,
  },
  {
    slug: "sweden",
    name: "Sweden",
    region: "Europe",
    cities: ["Stockholm"],
    ...pickImage(0),
    travelStyles: ["solo", "couple"],
    shortDescription:
      "Archipelago light, Gamla Stan cobbles, and fika breaks between islands and museums.",
    highlights: [
      "Ferries to the archipelago are simple in summer; winter schedules thin out.",
      "Cashless is the norm — cards everywhere.",
      "Midsummer and holidays can empty the city; plan groceries if self-catering.",
    ],
    featured: false,
  },
  {
    slug: "finland",
    name: "Finland",
    region: "Europe",
    cities: ["Helsinki"],
    ...pickImage(1),
    travelStyles: ["solo", "couple"],
    shortDescription:
      "Design, sea-facing saunas, and trams to islands when the light stays long.",
    highlights: [
      "Sauna culture is serious — book a slot and bring a towel.",
      "Summer days are long; winter is dark early — plan indoor backups.",
      "Ferries to Tallinn make an easy day or overnight hop.",
    ],
    featured: false,
  },
  {
    slug: "costa-rica",
    name: "Costa Rica",
    region: "Central America",
    cities: ["San Juan", "Liberia"],
    ...pickImage(2),
    travelStyles: ["solo", "couple", "group"],
    shortDescription:
      "Pacific gateway towns: beaches, dry forest, and volcano country within a few hours.",
    highlights: [
      "Dry season (roughly December–April) is busiest; green season is quieter.",
      "A 4x4 helps on rough coastal roads; main highways are paved.",
      "Wildlife is best at dawn and dusk — plan one slow nature morning.",
    ],
    featured: false,
  },
  {
    slug: "turks-and-caicos",
    name: "Turks & Caicos Island",
    region: "Caribbean",
    cities: [],
    ...pickImage(3),
    travelStyles: ["couple", "group"],
    shortDescription:
      "Turquoise water, powder sand, and a pace built around the beach and boat days on the island.",
    highlights: [
      "Grace Bay is the headline beach; smaller cays reward a boat charter.",
      "Groceries and dining add up — mix a few self-catered meals.",
      "Hurricane season runs late summer into fall — watch forecasts if booking then.",
    ],
    featured: false,
  },
];

export function getAllCountries(): Country[] {
  return countries;
}

export function getFeaturedCountries(): Country[] {
  const featuredOrder = ["finland", "italy", "vietnam"] as const;
  const featuredBySlug = new Map(countries.map((country) => [country.slug, country]));

  return featuredOrder
    .map((slug) => featuredBySlug.get(slug))
    .filter((country): country is Country => Boolean(country));
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((country) => country.slug === slug);
}
