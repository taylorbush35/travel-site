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
      note: "Swap in a real pick.",
    },
  ];
}

function defaultNeighborhoods(country: Country): CountryGuideSections["neighborhoods"] {
  const cities = country.cities.length
    ? country.cities
    : [`${country.name} (overview)`];

  return cities.slice(0, 4).map((city) => ({
    name: city,
    vibe: `A placeholder vibe for ${city} — warm streets, easy wandering.`,
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
      "Helsinki surprised me in the best way — my last stop, and the one I think about most.",
      "The sauna culture, the trams, the water — simple without being boring.",
      "It wasn’t the loudest stop on my trip. It’s the one that stayed with me.",
    ].join("\n\n"),
    neighborhoods: [
      {
        name: "Katajanokka",
        vibe: "A calm, tucked-away base near the water — quiet mornings, easy trams.",
      },
      {
        name: "Design District",
        vibe: "Shops, galleries, and streets built for wandering without a plan.",
      },
      {
        name: "Central Helsinki",
        vibe: "The easiest starting point — cathedrals, transit, and shopping, all together.",
      },
      {
        name: "Suomenlinna",
        vibe: "A sea fortress island that feels like a reset button.",
      },
    ],
    thingsToDo: {
      mustDo: [
        "Book a sauna experience at Löyly",
        "Visit Helsinki Cathedral",
        "Visit Uspenski Cathedral",
        "Take the ferry to Suomenlinna",
        "Wander the Design District",
        "Ride the trams — don’t overthink it",
      ],
    },
    foodDrink: {
      coffee: [
        {
          name: "Robert’s Cafe",
          area: "Helsinki",
          note: "Good coffee while you get oriented.",
        },
        {
          name: "Cafe Engel",
          area: "Helsinki",
          note: "Classic cafe energy — great for people-watching.",
        },
      ],
      casual: [
        {
          name: "Cafes around town",
          area: "Helsinki",
          note: "Open late — never rushed.",
        },
      ],
      dinner: [
        {
          name: "Löyly Restaurant",
          area: "Waterfront",
          note: "Book ahead and pair it with the sauna.",
        },
      ],
      cocktailsWine: [
        {
          name: "Wine bars & cafés",
          area: "Citywide",
          note: "Any spot that looks good. Just walk in.",
        },
      ],
    },
    shopping: [
      {
        name: "Design District shops",
        category: "Design & home",
        area: "Helsinki",
        note: "The good souvenirs — home goods and browsing.",
      },
      {
        name: "City Center",
        category: "Shopping areas",
        area: "Helsinki",
        note: "Everything centralized. Easy shopping.",
      },
    ],
    logistics: {
      gettingAround: "Trams are simple after one ride.",
      airport: "About 35–40 min to downtown — take the train.",
      transit: "Very walkable. Trams over taxis.",
      cashCard: "Card-friendly, everywhere.",
      tips: "Helsinki doesn’t need conquering. Let it be simple.",
    },
    weather: {
      bestMonths: "Spring or early summer — longer light, easier walking.",
      whatToExpect: "Cool air, waterfront wind, quick shifts.",
      whatToAvoid: "Packing like it’s warm just because the sun’s out.",
    },
    packing: {
      bring: [
        "Light layers",
        "Walking shoes",
        "Sunglasses",
        "A swimsuit for sauna",
        "A jacket for the water",
      ],
      wear: [
        "Neutral layers",
        "Put-together comfort",
        "Shoes for hours of walking",
      ],
      skip: [
        "“Just in case” shoes",
        "Heavy glam outfits",
        "Anything you can’t tram in",
      ],
    },
    finalThoughts: {
      closing:
        "Helsinki is not trying to overwhelm you, and that’s what makes it special. It’s calm, thoughtful, design-forward, and quietly beautiful.",
      whoItsFor:
        "I’d recommend it if you like cities that give you room to breathe — places where the best part isn’t running from landmark to landmark, but realizing you actually like the pace you’re moving at.",
    },
  },
  vietnam: {
    whyILovedIt: [
      "Never would’ve booked Vietnam myself — got sent for work, fell for Da Nang anyway.",
      "Beachy, tropical, calm and busy at once. My team’s warmth made the trip.",
      "This is really a Da Nang guide, with Hoi An as the day trip. I didn’t see enough of Ho Chi Minh to guide you there.",
    ].join("\n\n"),
    neighborhoods: [
      {
        name: "Da Nang (Han River)",
        vibe: "Where I actually lived — real-city busy, still calm enough to breathe.",
      },
      {
        name: "Hoi An",
        vibe: "Lanterns, tailors, bánh mì — worth the hour if you treat it as a real outing.",
      },
      {
        name: "Da Nang beach",
        vibe: "The tropical surprise. Views alone make Da Nang feel like more than a work trip.",
      },
      {
        name: "Ho Chi Minh City",
        vibe: "Wild and busy — a lot for a first Asia trip. I didn’t explore enough to map it.",
      },
    ],
    thingsToDo: {
      mustDo: [
        "Call a Grab motorbike in Da Nang and just go — the ride’s half the point",
        "Chase the water. Da Nang’s beach views are unreal",
        "Hòa Phú Thành for water slides and rafting — most fun I had",
        "Get clothes tailored at Silk Road in Hoi An",
        "Eat bánh xèo — my favorite food in the country",
        "Walk the Da Nang night market",
        "See the Hoi An lanterns as one full day, not a rushed stop",
      ],
    },
    foodDrink: {
      coffee: [
        {
          name: "Vietnamese coffee",
          area: "Everywhere",
          note: "The breakfast move. Don’t overthink the shop.",
        },
      ],
      casual: [
        {
          name: "Bánh mì",
          area: "Hoi An",
          note: "The sandwich I still think about.",
        },
        {
          name: "Street food, wherever it looks good",
          area: "Da Nang & Hoi An",
          note: "Everywhere, and worth trying blind.",
        },
        {
          name: "Live seafood",
          area: "Da Nang",
          note: "You pick it swimming. Intimidating. Worth it.",
        },
      ],
      dinner: [
        {
          name: "Bánh xèo",
          area: "Vietnam, whenever you see it",
          note: "My favorite food here, full stop.",
        },
        {
          name: "The non-touristy places in Hoi An",
          area: "Hoi An",
          note: "Skip anywhere performing for visitors.",
        },
      ],
      cocktailsWine: [
        {
          name: "A cold drink, not a scene",
          area: "Da Nang",
          note: "No nightlife-chasing needed after a motorbike ride.",
        },
      ],
    },
    shopping: [
      {
        name: "Silk Road",
        category: "Custom clothes",
        area: "Hoi An",
        note: "My go-to for tailored clothes. Tell them I sent you.",
      },
      {
        name: "Hoi An market streets",
        category: "Markets & shops",
        area: "Hoi An",
        note: "Most of my shopping happened right here.",
      },
      {
        name: "Da Nang night market",
        category: "Night market",
        area: "Da Nang",
        note: "Famous for a reason — go.",
      },
      {
        name: "Han Market",
        category: "Shopping street",
        area: "Da Nang",
        note: "One long street of shops. That’s the one.",
      },
    ],
    logistics: {
      gettingAround: "Grab for everything — motorbikes in Da Nang, no bikes for me in Ho Chi Minh.",
      airport: "Long flight. Land early morning or afternoon to beat jet lag.",
      transit: "Hoi An’s ~1 hr away. For Hòa Phú Thành, hire a driver — Grab thins out there.",
      cashCard: "Card works almost everywhere. Bring $200–300 to exchange in town — flat, new bills.",
      tips: "Crossing streets: just go, there’s no real walk signal. English isn’t everywhere — people are kind about it anyway.",
      warning:
        "Put a card on Grab before requesting a ride. Book with cash and you’re stuck with it — learned that one in a panic.",
    },
    weather: {
      bestMonths: "February–May, or November. Spring’s the most forgiving window.",
      whatToExpect: "Hot, humid, beachy — pack for tropical, not dry heat.",
      whatToAvoid: "Early August heat, and October–November storm season.",
    },
    packing: {
      bring: [
        "Bug spray",
        "An umbrella",
        "A rain jacket",
        "A swimsuit",
        "Light, sweat-proof clothes",
      ],
      wear: [
        "Whatever’s actually comfortable — no dress code",
        "Heat-proof, not cute-and-melting",
        "Shoes for markets and motorbikes",
      ],
      skip: [
        "Heavy layers",
        "Anything you wouldn’t wear on a bike",
        "A schedule that assumes Hoi An is “right there”",
      ],
    },
    finalThoughts: {
      closing:
        "I’d go back in a heartbeat. I want to go back for work, to see my team, and I would absolutely go back for fun if the chance showed up. Da Nang is one of my favorite places in the world — you just feel settled there. Calm and busy at the same time.",
      whoItsFor:
        "It’s really good for families, solo travelers, and friends. It’s one of those places where you can kind of get away with anything. If you only go where you’d already put on a vision board, you might miss it — I only went because of a job, and I loved it anyway.",
    },
  },
};

function buildDefaultGuide(country: Country): CountryGuideSections {
  const tripStyle = travelStylesLabel(country);

  return {
    whyILovedIt: `${country.name} stuck with me — the rhythm of the days, the wins when a plan worked, the honest moments over performative ones.\n\nGo in expecting some friction, and you’ll enjoy the good parts more.`,
    neighborhoods: defaultNeighborhoods(country),
    thingsToDo: {
      mustDo: listFromHighlights(country, 3),
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
        note: "Name the one you actually browsed.",
      },
      {
        name: "Design or bookstore stop",
        category: "Shops",
        note: "Good for a calm hour between sightseeing.",
      },
      {
        name: "Neighborhood shopping stroll",
        category: "Areas",
        note: "A district where window-shopping is part of the day.",
      },
    ],
    logistics: {
      gettingAround: `How you actually moved through ${country.name} — the short version.`,
      airport: "Distance to town, typical transfer, and how you’d get in.",
      transit: country.highlights[0] ?? "Placeholder: passes, tap-to-pay, or apps that worked.",
      cashCard: "Placeholder: ATM tips and where cards failed.",
      tips:
        country.highlights.length > 1
          ? country.highlights.slice(1).join(" ")
          : "Add one thing you wish you knew earlier.",
    },
    weather: {
      bestMonths: "Placeholder — your favorite shoulder-season window.",
      whatToExpect: `${country.region}-style surprises — wind, heat, sudden rain.`,
      whatToAvoid: "Placeholder — storm season or weeks when crowds outweigh the vibe.",
    },
    packing: {
      bring: [
        "A shell layer for chilly interiors and breezy evenings",
        "Shoes you’d actually walk 8 miles in",
      ],
      wear: [
        "Neutral layers that dress up or down",
        "One nicer outfit for a special dinner",
      ],
      skip: [
        "Heavy gear you won’t use twice",
        "Too many “just in case” shoes",
      ],
    },
    finalThoughts: {
      closing: `Would I recommend ${country.name}? Yes — especially if you like trips where the schedule has slack built in.`,
      whoItsFor: `Best for ${tripStyle.toLowerCase()} travelers who want real texture over a highlight reel.`,
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
