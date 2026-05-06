/** Anchor IDs and labels for country guide in-page navigation — single source of truth */

export const COUNTRY_GUIDE_NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "why-i-loved-it", label: "Why I loved it" },
  { id: "neighborhoods", label: "Neighborhoods" },
  { id: "things-to-do", label: "Things to do" },
  { id: "food-drink", label: "Food & drink" },
  { id: "shopping", label: "Shopping" },
  { id: "logistics", label: "Logistics" },
  { id: "weather", label: "Weather" },
  { id: "packing", label: "Packing notes" },
  { id: "final-thoughts", label: "Final thoughts" },
] as const;

export type CountryGuideNavId = (typeof COUNTRY_GUIDE_NAV_ITEMS)[number]["id"];
