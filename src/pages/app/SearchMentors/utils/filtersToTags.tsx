import { FiltersSelected, FilterTag } from "@customTypes/mentor";

export const filtersToTags = (filters: FiltersSelected): FilterTag[] => {
  const tags: FilterTag[] = [];
  if (filters.categories.length) {
    filters.categories.forEach((category) => {
      tags.push({
        name: "categories",
        displayValue: category.label,
      });
    });
  }
  if (filters.skills.length) {
    filters.skills.forEach((skill) => {
      tags.push({
        name: "skills",
        displayValue: skill.label,
      });
    });
  }
  if (filters.services.length) {
    filters.services.forEach((service) => {
      tags.push({
        name: "services",
        displayValue: service.label,
      });
    });
  }
  tags.push({
    name: "priceMin",
    displayValue: `$${filters.priceMin}-$${filters.priceMax}`,
  });
  return tags;
};
