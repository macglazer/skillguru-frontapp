import { PAGE_SIZE } from "../config";
import { FiltersSelected } from "@customTypes/mentor";

export const getSearchUrl = (
  page: number,
  filters: FiltersSelected
): string => {
  const params = {
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    categories: filters.categories.map(c => c.value).join(','),
    skills: filters.skills.map(c => c.value).join(','),
    services: filters.services.map(c => c.value).join(','),
  }
  const sp = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    sp.append(key, String(value))
  })

  return `/search-mentor-results-mocked.json?${sp.toString()}`;
};
