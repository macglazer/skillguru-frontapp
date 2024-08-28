import { SortOption } from "@customTypes/mentor";

// Display maximum 5 options or 4 options + show more btn
export const FILTERS_CHECKBOXES_ROWS_LIMIT = 5;

export const PAGE_SIZE = 3;

export const SEARCH_DELAY = 800

export const sortOptions : { value: SortOption, label: string }[] = [
  { value: 'rateDESC', label: 'Najwyższa ocena', },
  { value: 'rateASC', label: 'Najniższa ocena', },
  { value: 'priceASC', label: 'Najniższa cena', },
  { value: 'priceDESC', label: 'Najwyższa cena', },
]
