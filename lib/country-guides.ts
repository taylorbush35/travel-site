import type { Country } from "@/lib/types";
import type { CountryGuideSections, FoodEntry } from "@/lib/country-guide-types";

function travelStylesLabel(country: Country): string {
  const map: Record<string, string> = {
    solo: "Solo",
    couple: "Couples",
    group: "Small groups",
  };
  return country.travelStyles.map((s) => map[s] ?? s).join(" · ");
}

function placeholderFood(label: string): FoodEntry[] {
  return [
    {
      name: `Add a ${label} spot`,
      area: "—",
      note: "Replace with a real pick when you edit this guide.",
    },
  ];
}

function defaultNeighborhoods(country: Country): CountryGuideSections["neighborhoods"] {
  const cities = country.cities.length
    ? country.cities
    : [`${country.name} (overview)`];

  return cities.slice(0, 4).map((city) => ({
    name: city,
    vibe: `A placeholder vibe for ${city} — warm streets, local rhythm, and room to wander without a rigid itinerary.`,
    bestFor: "First-time visitors",
  }));
}

function listFromHighlights(
  country: Country,
  take: number,
): string[] {
  const h = country.highlights;
  if (h.length >= take) return h.slice(0, take);
  return [
    ...h,
    ...Array.from({ length: take - h.length }, (_, i) =>
      `Detail ${i + 1} to add: what surprised you most about ${country.name}?`,
    ),
  ];
}

function deepMerge<T extends Record<string, unknown>>(
  base: T,
  patch: Partial<T>,
): T {
  const out = { ...base } as T;
  for (const key of Object.keys(patch) as (keyof T)[]) {
    const pv = patch[key];
    if (pv === undefined) continue;
    const bv = base[key];
    if (Array.isArray(pv)) {
      (out as Record<string, unknown>)[key as string] = pv;
    } else if (
      pv &&
      typeof pv === "object" &&
      !Array.isArray(pv) &&
      bv &&
      typeof bv === "object" &&
      !Array.isArray(bv)
    ) {
      (out as Record<string, unknown>)[key as string] = deepMerge(
        bv as Record<string, unknown>,
        pv as Record<string, unknown>,
      );
    } else {
      (out as Record<string, unknown>)[key as string] = pv;
    }
  }
  return out;
}

/** Optional per-slug overrides — merge on top of generated defaults */
const GUIDE_OVERRIDES: Partial<
  Record<string, Partial<CountryGuideSections>>
> = {
  finland: {
    whyILovedIt: [
      "Helsinki surprised me in the best way — and I think it will for you too. It was my last stop on my solo trip and I went into it with pretty much no expectations.",
      "From the sauna culture to quiet friendliness, there is something sneakily special about Helsinki.",
      "There was something about the trams, the water, the quiet confidence of the city, and the way everything felt simple without feeling boring.",
      "It wasn’t the loudest stop on my trip, but it was the one that stayed with me.",
    ].join("\n\n"),
    neighborhoods: [
      {
        name: "Katajanokka",
        vibe: "A calm, slightly tucked-away base near the water. Great if you want quiet mornings, easy tram access, and a more peaceful home base.",
        bestFor: "Slow mornings, waterfront walks, staying somewhere quieter",
      },
      {
        name: "Design District",
        vibe: "Shops, galleries, cafes, and streets that make you want to wander without a plan.",
        bestFor: "Shopping, design, aesthetic little finds",
      },
      {
        name: "Central Helsinki",
        vibe: "Your easiest starting point for cathedrals, transit, shopping, and getting oriented.",
        bestFor: "First day exploring",
      },
      {
        name: "Suomenlinna",
        vibe: "A sea fortress island that feels like a reset button outside the city.",
        bestFor: "Water views, slow walks, fresh air",
      },
    ],
    thingsToDo: {
      mustDo: [
        "Book a sauna experience at Löyly",
        "Visit Helsinki Cathedral",
        "Visit Uspenski Cathedral",
        "Take the ferry to Suomenlinna",
        "Wander the Design District",
        "Ride the trams instead of overthinking transit",
      ],
      worthItIf: [
        "Do a Porvoo day trip if you want a charming town moment",
        "Spend extra time by the water if you need a slower day",
        "Pop into small design shops even if you’re “just looking”",
      ],
      skipOrLower: [
        "Trying to over-schedule the city",
        "Treating Helsinki like a checklist destination",
        "Only staying near the central station and not wandering farther out",
      ],
    },
    foodDrink: {
      coffee: [
        {
          name: "Robert’s Cafe",
          area: "Helsinki",
          note: "A solid breakfast-and-coffee stop while you’re getting oriented.",
        },
        {
          name: "Cafe Engel",
          area: "Helsinki",
          note: "Classic cafe energy — good for people-watching and a slower morning.",
        },
      ],
      casual: [
        {
          name: "Cafes around town",
          area: "Helsinki",
          note: "Every cafe is open pretty late, so you can grab food or linger without feeling rushed.",
        },
      ],
      dinner: [
        {
          name: "Löyly Restaurant",
          area: "Waterfront",
          note: "Natural pairing if you’re doing the sauna experience at Löyly — worth booking ahead.",
        },
      ],
      cocktailsWine: [
        {
          name: "Wine bars & cafés",
          area: "Citywide",
          note: "Literally any wine bar or cafe that looks good — just stop in.",
        },
      ],
    },
    shopping: [
      {
        name: "Design District shops",
        category: "Design & home",
        note: "Best for home goods, design, browsing, and aesthetic souvenirs.",
      },
      {
        name: "City Center",
        category: "Shopping areas",
        note: "Best for easy shopping — main shops centralized in one area.",
      },
    ],
    logistics: {
      gettingAround:
        "The tram system is easy once you do it once. Don’t let the first ride intimidate you.",
      airport:
        "Plan your route before you land so you’re not figuring it out while tired. The airport is about 35–40 minutes from the city center. The train goes straight to the center and is very easy to navigate.",
      transit:
        "Trams are the move. Helsinki is very manageable without a car — or just walk.",
      cashCard: "Card-friendly and easy.",
      tips: "Helsinki is not a city you need to conquer. Let it be simple.",
    },
    weather: {
      bestMonths:
        "Spring or early summer if you want longer light and easier walking weather.",
      whatToExpect:
        "Cooler air, waterfront wind, and weather that can shift quickly.",
      whatToAvoid:
        "Packing like it’s warm just because the sun is out.",
    },
    packing: {
      bring: [
        "Light layers",
        "Comfortable walking shoes",
        "Sunglasses",
        "A swimsuit for sauna",
        "A jacket that works near the water",
      ],
      wear: [
        "Neutral layers",
        "Comfortable but put-together outfits",
        "Shoes you can walk in for hours",
      ],
      skip: [
        "Too many “just in case” shoes",
        "Heavy glam outfits",
        "Anything you wouldn’t want to wear while walking, shopping, or hopping on a tram",
      ],
    },
    finalThoughts: {
      closing:
        "Helsinki is not trying to overwhelm you, and that’s what makes it special. It’s calm, thoughtful, design-forward, and quietly beautiful.",
      whoItsFor:
        "I’d recommend it if you like cities that give you room to breathe — places where the best part isn’t running from landmark to landmark, but realizing you actually like the pace you’re moving at.",
    },
  },
};

function buildDefaultGuide(country: Country): CountryGuideSections {
  const tripStyle = travelStylesLabel(country);
  const citiesLine =
    country.cities.length > 0
      ? country.cities.join(", ")
      : "the main hubs below";

  return {
    whyILovedIt: `${country.name} stuck with me for reasons that are hard to explain in a brochure: the rhythm of the days, the small wins when a plan actually works, and the places that felt honest instead of performative. I’m not claiming it’s perfect — but it’s the kind of trip I think about when I’m booking the next one.\n\nIf you only read one personal note in this guide, make it this: go in expecting some friction (language, timing, weather), and you’ll enjoy the good parts more.`,
    neighborhoods: defaultNeighborhoods(country),
    thingsToDo: {
      mustDo: listFromHighlights(country, 3),
      worthItIf: [
        `You’re curious about a slower day outside ${citiesLine.split(",")[0] ?? "the main city"}.`,
        "You don’t mind trading a perfect photo for a quieter moment.",
        `You want one “splurge” experience that ${country.name} does uniquely well.`,
      ],
      skipOrLower: [
        "Anything that requires sprinting across town every day — you’ll miss the point.",
        "Over-packed museum days without breaks — plan one lighter afternoon.",
        "Placeholder: swap this with the tourist traps you actually skipped.",
      ],
    },
    foodDrink: {
      coffee: placeholderFood("coffee/breakfast"),
      casual: placeholderFood("miscellaneous"),
      dinner: placeholderFood("dinner"),
      cocktailsWine: placeholderFood("drink"),
    },
    shopping: [
      {
        name: "Local market / hall",
        category: "Markets",
        note: "Placeholder — name the one you actually browsed.",
      },
      {
        name: "Design or bookstore stop",
        category: "Shops",
        note: "Good for a calm hour between bigger sightseeing blocks.",
      },
      {
        name: "Neighborhood shopping stroll",
        category: "Areas",
        note: "Replace with a district where windows-shopping is part of the day.",
      },
    ],
    logistics: {
      gettingAround: `Start with how you actually moved through ${country.name} — trains, walks, rental, or a mix. Note what felt easy vs. annoying.`,
      airport: "Add your arrival airport notes: distance to town, typical transfer time, and whether you’d Uber, train, or pre-book.",
      transit: country.highlights[0] ?? "Placeholder: metro/bus passes, tap-to-pay, or apps that worked.",
      cashCard: "Placeholder: ATM tips, small bills for markets, and where cards failed.",
      tips:
        country.highlights.length > 1
          ? country.highlights.slice(1).join(" ")
          : "Add 2–3 honest logistics tips you wish you knew earlier.",
    },
    weather: {
      bestMonths: "Placeholder — name your favorite shoulder season window and why.",
      whatToExpect: `In short: expect ${country.region}-style surprises (wind, heat waves, sudden rain) even when the forecast looks fine.`,
      whatToAvoid: "Placeholder — storm season, holiday closures, or weeks when crowds outweigh the vibe.",
    },
    packing: {
      bring: [
        "A shell layer that works for chilly interiors and breezy evenings",
        "Comfortable shoes you’d actually walk 8 miles in",
        "Placeholder — add your one ‘glad I packed this’ item",
      ],
      wear: [
        "Neutral layers that can dress up or down",
        "One nicer outfit if you book a special dinner",
      ],
      skip: [
        "Heavy gear you won’t use twice",
        "Too many ‘just in case’ shoes",
      ],
    },
    finalThoughts: {
      closing: `Would I recommend ${country.name}? Yes — especially if you like trips where the schedule has slack built in. It’s not about checking every box; it’s about liking where you are while you’re there.`,
      whoItsFor: `Best for ${tripStyle.toLowerCase()} travelers who want real texture over a highlight reel — and who don’t mind doing a little homework before wheels-up.`,
    },
  };
}

export function getCountryGuideSections(country: Country): CountryGuideSections {
  const base = buildDefaultGuide(country);
  const patch = GUIDE_OVERRIDES[country.slug];
  if (!patch) return base;
  return deepMerge(
    base as unknown as Record<string, unknown>,
    patch as unknown as Record<string, unknown>,
  ) as CountryGuideSections;
}
