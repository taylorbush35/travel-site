/** Structured editorial content for the country guide template */

export type FoodEntry = {
  name: string;
  /** Neighborhood or area — optional */
  area?: string;
  note: string;
};

export type NeighborhoodEntry = {
  name: string;
  vibe: string;
  bestFor: string;
};

export type ShoppingEntry = {
  name: string;
  category: string;
  note: string;
};

export type CountryGuideSections = {
  /** “Why I loved it” — personal, opinionated */
  whyILovedIt: string;
  neighborhoods: NeighborhoodEntry[];
  thingsToDo: {
    mustDo: string[];
    worthItIf: string[];
    skipOrLower: string[];
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
