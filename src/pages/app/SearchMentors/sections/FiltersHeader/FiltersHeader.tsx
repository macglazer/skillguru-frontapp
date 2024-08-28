import React from "react";
import Container from "src/components/Container/Container";
import {Tag} from "src/types/tags";
import styles from "./FiltersHeader.module.scss";
import {sortOptions} from "../../config";
import SearchSvg from "@icons/SearchSvg";
import {
    FilterName,
    FiltersSelected,
    Option,
    SortOption,
} from "@customTypes/mentor";
import {FilterTag} from "../../elements";
import {FilterSearchSvg} from "@icons/FilterSearchSvg";
import Select from "../../../../../components/Select/Select";

type FiltersHeaderProps = {
    displayed: number;
    error: string;
    filters: FiltersSelected;
    pending: boolean;
    total: number;
    handleChangeSortOption: (selected: SortOption) => void;
    handleClearFilters: () => void;
    handleRemoveFilter: (name: FilterName, opt: Option) => void;
    handleRemovePrice: () => void;
    onChangePhrase: React.ChangeEventHandler<HTMLInputElement>;
    toggleFiltersSidebar: () => void;
};

export const FiltersHeader = ({
                                  displayed,
                                  error,
                                  filters,
                                  pending,
                                  total,
                                  handleChangeSortOption,
                                  handleClearFilters,
                                  handleRemoveFilter,
                                  handleRemovePrice,
                                  onChangePhrase,
                                  toggleFiltersSidebar,
                              }: FiltersHeaderProps) => {
    const selectedSortOption = sortOptions.find((s) => s.value === filters.sort);

    if (!selectedSortOption) {
        return null;
    }

    return (
        <Container as={Tag.Section} classes={styles.wrapper}>
            <div className={styles.wrapper}>
                <div className={styles.phraseRow}>
                    <input
                        className={styles.input}
                        placeholder="Wyszukaj"
                        value={filters.phrase}
                        onChange={onChangePhrase}
                    />
                    <SearchSvg className={styles.icon}/>
                    <button
                        className={styles.filterToggle}
                        onClick={toggleFiltersSidebar}
                        type="button"
                    >
                        <FilterSearchSvg className={styles.filterIcon}/>
                    </button>
                </div>
                <div className={styles.tags}>
                    {filters.categories.map((opt, i) => (
                        <FilterTag
                            key={`${i}-${opt.value}-${opt.label}`}
                            text={opt.label}
                            handleRemove={() => handleRemoveFilter("categories", opt)}
                        />
                    ))}

                    {filters.skills.map((opt, i) => (
                        <FilterTag
                            key={`${i}-${opt.value}-${opt.label}`}
                            text={opt.label}
                            handleRemove={() => handleRemoveFilter("skills", opt)}
                        />
                    ))}

                    {filters.services.map((opt, i) => (
                        <FilterTag
                            key={`${i}-${opt.value}-${opt.label}`}
                            text={opt.label}
                            handleRemove={() => handleRemoveFilter("services", opt)}
                        />
                    ))}

                    {filters.topics.map((opt, i) => (
                        <FilterTag
                            key={`${i}-${opt.value}-${opt.label}`}
                            text={opt.label}
                            handleRemove={() => handleRemoveFilter("topics", opt)}
                        />
                    ))}

                    <FilterTag
                        text={`$${filters.priceMin} - $${filters.priceMax}`}
                        handleRemove={handleRemovePrice}
                    />

                    <FilterTag
                        variant="clear"
                        text="Wyczyść filtry"
                        handleClick={handleClearFilters}
                    />
                </div>

                <div className={styles.resultsSummaryRow}>
          <span className={styles.text}>
            {!pending && (
                <>
                    Wyświetlam {displayed} z {total} mentorów
                </>
            )}
          </span>
                    <div className={styles.inlineRow}>
                        <span className={styles.text}>Sortuj od</span>
                        <Select
                            id="sort"
                            name="sortingOption"
                            options={sortOptions}
                            value={filters.sort}
                            label={selectedSortOption.label}
                            valueChangeHandler={(_: string, value: string) => {
                                handleChangeSortOption(value as SortOption);
                            }}
                            isMulti={false}
                            classes={styles.select}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};
