import React from "react";
import { 
    FilterName,
    FiltersSelected,
    Option,
    Terms,
  } from "@customTypes/mentor";
import styles from "./FiltersSidebar.module.scss";
import { FiltersCheckboxes, FiltersGroup, FiltersRange } from "../../elements";
import { FILTERS_CHECKBOXES_ROWS_LIMIT } from "../../config";

type FiltersSidebarProps = {
  terms: Terms;
  filters: FiltersSelected;
  handleChange: (filters: Partial<FiltersSelected>) => void;
};
 
export const FiltersSidebar = ({
  terms,
  filters,
  handleChange,
}: FiltersSidebarProps) => {
  return (
    <div className={styles.wrapper}>
      <FiltersGroup title="Cena za 1h">
        <FiltersRange
          min={0}
          max={299}
          valueMin={filters.priceMin}
          valueMax={filters.priceMax}
          handleChange={(min: number, max: number) => {
            handleChange({
              priceMin: min,
              priceMax: max,
            })
          }}
        />
      </FiltersGroup>
      <FiltersGroup title="Kategoria">
        <FiltersCheckboxes
          name="categories"
          startedRows={FILTERS_CHECKBOXES_ROWS_LIMIT}
          options={terms.categories}
          selected={filters.categories}
          handleChange={(name: FilterName, selected: Option[]) => {
            handleChange({
              [name]: selected,
            })
          }}
        />
      </FiltersGroup>
      <FiltersGroup title="Umiejętności">
        <FiltersCheckboxes
          name="skills"
          startedRows={FILTERS_CHECKBOXES_ROWS_LIMIT}
          options={terms.skills}
          selected={filters.skills}
          handleChange={(name: FilterName, selected: Option[]) => {
            handleChange({
              [name]: selected,
            })
          }}
        />
      </FiltersGroup>
      <FiltersGroup title="Usługi">
        <FiltersCheckboxes
          name="services"
          startedRows={FILTERS_CHECKBOXES_ROWS_LIMIT}
          options={terms.services}
          selected={filters.services}
          handleChange={(name: FilterName, selected: Option[]) => {
            handleChange({
              [name]: selected,
            })
          }}
        />
      </FiltersGroup>
        <FiltersGroup title="Tematy">
            <FiltersCheckboxes
                name="topics"
                startedRows={FILTERS_CHECKBOXES_ROWS_LIMIT}
                options={terms.topics}
                selected={filters.topics}
                handleChange={(name: FilterName, selected: Option[]) => {
                    handleChange({
                        [name]: selected,
                    })
                }}
            />
        </FiltersGroup>
    </div>
  );
};
