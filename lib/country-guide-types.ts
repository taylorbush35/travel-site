/** Structured editorial content for the country guide template */

export type FoodEntry = {
  name: string;
  /** Neighborhood or area — optional */
  area?: string;
  note: string;
  /** Optional photo for carousel cards */
  image?: string;
};

export type NeighborhoodEntry = {
  name: string;
  vibe: string;
};

export type ShoppingEntry = {
  name: string;
  category: string;
  /** Neighborhood or area — optional */
  area?: string;
  note: string;
  /** Optional photo — used sparingly, this section stays typographic */
  image?: string;
};

export type CountryGuideSections = {
  /** “Why I loved it” — personal, opinionated */
  whyILovedIt: string;
  neighborhoods: NeighborhoodEntry[];
  thingsToDo: {
    mustDo: string[];
  };
  foodDrink: {
    coffee: FoodEntry[];
    casual: FoodEntry[];
    dinner: FoodEntry[];
    cocktailsWine: FoodEntry[];
  };
  shopping: ShoppingEntry[];
  logistics: {
    gettingAround: string;
    airport: string;
    transit: string;
    cashCard: string;
    tips: string;
    /** A specific personal warning — rendered as a highlighted "learned this the hard way" callout. Optional; omit rather than invent one. */
    warning?: string;
  };
  weather: {
    bestMonths: string;
    whatToExpect: string;
    whatToAvoid: string;
  };
  packing: {
    bring: string[];
    wear: string[];
    skip: string[];
  };
  finalThoughts: {
    closing: string;
    whoItsFor: string;
  };
};
