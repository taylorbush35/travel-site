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
      },
      {
        name: "Design District",
        vibe: "Shops, galleries, cafes, and streets that make you want to wander without a plan.",
      },
      {
        name: "Central Helsinki",
        vibe: "Your easiest starting point for cathedrals, transit, shopping, and getting oriented.",
      },
      {
        name: "Suomenlinna",
        vibe: "A sea fortress island that feels like a reset button outside the city.",
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
  vietnam: {
    whyILovedIt: [
      "I never would have gone to Vietnam if it wasn’t for work. I got sent, I showed up, and Da Nang ended up becoming one of my favorite cities in the entire world.",
      "The most recent trip was about ten days, based in Da Nang proper along the Han River. It was far better than any of my earlier visits. The city is beachy and tropical in a way I wasn’t expecting — calm and busy at the same time, with everyone just doing their own thing.",
      "This was some of my first time traveling somewhere not a lot of English is spoken. My engineering team is out there, and everyone is so welcoming. They’re excited to talk to you. They want to know where you’re from and what you’re doing. That, plus calling a motorbike like an Uber and riding toward the water, is the part I will never forget.",
      "Ho Chi Minh was my first time in Asia, a couple of years ago. I was dropped off with two coworkers and we figured it out as we went. It’s beautiful, and it’s a proper city — one of the busiest I’ve ever seen — but I didn’t explore enough to pretend this is a Ho Chi Minh guide. This one is really about Da Nang, with Hoi An as the day you actually plan for.",
    ].join("\n\n"),
    neighborhoods: [
      {
        name: "Da Nang (Han River)",
        vibe: "This is where I actually lived the trip — city proper, right by the river, close to the office. It feels settled: busy enough to be a real city, calm enough that you can still have a day. The beach is part of the whole mood, even when you’re not on it.",
      },
      {
        name: "Hoi An",
        vibe: "Lanterns, tailor shops, bánh mì, and the version of Vietnam people have already seen in photos. It’s about an hour from Da Nang, and it’s worth it — if you treat it like a real outing, not a quick errand.",
      },
      {
        name: "Da Nang beach",
        vibe: "The tropical part I wasn’t prepared for. The views are incredible. It’s the reason Da Nang doesn’t feel like a generic work city — you can be in town and still feel like you’re somewhere with water.",
      },
      {
        name: "Ho Chi Minh City",
        vibe: "A proper, wild city. The motorbike culture is intense everywhere in Vietnam, but here it felt like a different sport. Beautiful, busy, and a lot if it’s your first time in Asia. I stayed close to the office and didn’t do enough exploring to give you a neighborhood map.",
      },
    ],
    thingsToDo: {
      mustDo: [
        "Call a Grab motorbike in Da Nang and just go — it’s like an Uber, and the ride itself is half the point",
        "Spend time by the water. The beach views in Da Nang are insane",
        "Go to Hòa Phú Thành (you’ll hear it as Ho Fu Tan) — outdoor water slides and rafting. Our engineers took us and it was the most fun I had",
        "Get clothes tailored at Silk Road in Hoi An. That’s the reason to go",
        "Eat bánh xèo. It’s my favorite food in Vietnam, and I’m not being cute about it",
        "Walk the Da Nang night market. Famous for a reason — go",
        "See the lanterns in Hoi An, but do it as one planned day or stay over",
      ],
      worthItIf: [
        "You’re brave enough to drive a motorbike yourself. If not, just get on the back of one",
        "You want to stay a night or two in Hoi An instead of day-tripping from Da Nang",
        "You’re willing to pick live seafood and have them cook it right there — intimidating, worth trying",
        "Hòa Phú Thành is on the list — a private driver is easier than hoping Grab will take you that far",
      ],
      skipOrLower: [
        "Shuttling Da Nang → Hoi An over and over. An hour each way, multiple times, will make you hate a place you were supposed to like",
        "Anywhere in Hoi An that feels touristy on purpose. You’ll know. Walk past it",
        "Getting on the back of a bike in Ho Chi Minh. I would never",
        "Treating Ho Chi Minh like the main event if you only have Da Nang time — I didn’t see enough of it to send you on a scavenger hunt",
      ],
    },
    foodDrink: {
      coffee: [
        {
          name: "Vietnamese coffee",
          area: "Everywhere",
          note: "The number one thing. This is the breakfast move. Don’t overthink the shop — just get the coffee.",
        },
      ],
      casual: [
        {
          name: "Bánh mì",
          area: "Hoi An (and anywhere you see it)",
          note: "The sandwich. Street food. Hoi An’s is the one I still think about — get it while you’re already in town, not as a reason to shuttle back a fourth time.",
        },
        {
          name: "Street food, wherever it looks good",
          area: "Da Nang & Hoi An",
          note: "Street food is popular, easy, and everywhere. Try things you haven’t had. The food can feel seafood-heavy if that’s not your usual — lean in anyway.",
        },
        {
          name: "Live seafood",
          area: "Da Nang",
          note: "You pick it while it’s still swimming, and they cook it for you right then. It sounds like a lot. It is a lot. Still try it.",
        },
      ],
      dinner: [
        {
          name: "Bánh xèo",
          area: "Vietnam, whenever you see it",
          note: "My favorite food in the country. If you only take one food note from this page, take this one.",
        },
        {
          name: "The non-touristy places in Hoi An",
          area: "Hoi An",
          note: "There are really good spots. Stay away from the ones performing for visitors — you can always tell.",
        },
      ],
      cocktailsWine: [
        {
          name: "A cold drink, not a scene",
          area: "Da Nang",
          note: "I didn’t chase nightlife here. After the heat and a motorbike ride, any normal spot with a cold drink is enough.",
        },
      ],
    },
    shopping: [
      {
        name: "Silk Road",
        category: "Custom clothes · Hoi An",
        note: "I always go here. Best one for clothes made. If you end up going, let me know — and tell them I sent you.",
      },
      {
        name: "Hoi An market streets",
        category: "Markets & shops",
        note: "A lot of my shopping happened here — market streets, little shops, the whole old-town browse.",
      },
      {
        name: "Da Nang night market",
        category: "Night market",
        note: "Very famous, and you should absolutely go. It’s the Da Nang shopping night I actually remember.",
      },
      {
        name: "Han Market",
        category: "Da Nang",
        note: "The long shopping street near the night market — a few kilometers away. One long street of shops. That’s the one.",
      },
    ],
    logistics: {
      gettingAround:
        "Grab is how you do everything. It’s cheap, easy, and the number one way to move. In Da Nang, motorbikes are the move — call one like an Uber. In Ho Chi Minh, I would not get on the back of a bike.",
      airport:
        "The flight is long. There is no way around that. If you can land back home in the early morning or afternoon, you’ll stay ahead of the jet lag. Do not exchange money at the airport — the rate is terrible.",
      transit:
        "Within the city: motorbikes, or Grab when you don’t want the bike. Hoi An is about an hour from Da Nang. For Hòa Phú Thành, our engineers drove us — Grab can get thin that far out, so look at the ride situation before you commit, or hire a driver. We did that too, and it was nice.",
      cashCard:
        "Pretty much everywhere takes card. Still bring $200–300 USD and exchange it into Vietnamese dong once you’re in town — not at the airport. Look for a decent rate; Hoi An has little stands that will do it. Flat bills only. Brand-new bills get you a better rate. Put your card in Grab before you ever request a ride. You can pay Grab in cash, and once a trip is booked that way, you cannot switch to card. I learned this the hard way, had a full panic, and we had to scramble American dollars. They took it. Do not be me.",
      tips: "Crossing the street: you just go. There aren’t real pedestrian walk signals the way you’re used to. It takes a minute, and after a few days you’ll be a natural. English isn’t everywhere, and people are still incredibly kind about it. Dress code is not precious — I wore what I’d actually be comfortable in.",
    },
    weather: {
      bestMonths:
        "February through May is the window I’d aim for. November can work too. Spring is probably the most forgiving version of this trip.",
      whatToExpect:
        "August was hotter than hell — about 90 degrees and 90% humidity the entire time. November (my first trip) wasn’t necessarily too hot, just super rainy. It is a beachy, tropical city. Pack for that, not for a dry heat wave.",
      whatToAvoid:
        "October–November can slide into storm/typhoon season, so keep an eye on forecasts even if the calendar looks nice. I wouldn’t plan around early August unless you like being cooked. Also don’t pack like it’s only humid — when it rains, it rains.",
    },
    packing: {
      bring: [
        "Bug spray",
        "An umbrella",
        "A rain jacket",
        "A swimsuit (Hòa Phú Thành will soak you)",
        "Light clothes you can actually sweat in",
        "New, flat US bills if you’re exchanging cash",
      ],
      wear: [
        "Whatever you’d actually be comfortable in — there’s no strict dress code",
        "Heat-and-humidity clothes, not cute outfits that melt",
        "Shoes you can walk markets in, then hop on a motorbike",
      ],
      skip: [
        "Heavy layers you won’t touch in August",
        "Anything you wouldn’t want on the back of a bike",
        "A packed schedule that assumes Hoi An is ‘right there’",
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
