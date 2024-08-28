// Libraries
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
// Components
import AppHeader from "src/components/AppHeader/AppHeader";
import {
  FiltersHeader,
  FiltersPopup,
  MentorsList,
  FiltersSidebar,
} from "./sections";
import Container from "src/components/Container/Container";
// Types
import { SortOption } from "@customTypes/mentor";
import { Tag } from "src/types/tags";
// Variables
import { PAGE_SIZE, SEARCH_DELAY } from "./config";
// Utils
import { termsReducer } from "src/reducers/terms";
import { termsInitialState } from "src/reducers/terms/constants";
import styles from "./SearchMentors.module.scss";
import { mentorsReducer } from "src/reducers/mentors";
import { mentorsInitialState } from "src/reducers/mentors/constants";
import { FilterName, FiltersSelected, Option } from "@customTypes/mentor";
import { fetchMentorFilteredList } from "src/services/mentor/fetchMentorServices.service";
import { fetchTerms } from "../../../services/terms.service";


export type LocationTypes = {
  pathname: string;
  state: {
    filters: any;
    from: string;
  };
  search: string;
  hash: string;
  key: string;
};

const SearchMentors = () => {
  const [terms, dispatchTerms] = useReducer(termsReducer, termsInitialState);
  const [state, dispatchMentors] = useReducer(
    mentorsReducer,
    mentorsInitialState
  );
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  const searchMore = useCallback(
    async (page: number, filters: FiltersSelected) => {
      try {
        dispatchMentors({
          type: "UPDATE_REQUEST_STATE",
          payload: { error: "", pending: true },
        });
        const { mentors, total } = await fetchMentorFilteredList(
          PAGE_SIZE,
          (page - 1) * PAGE_SIZE,
          filters
        );
        dispatchMentors({
          type: page === 1 ? "UPDATE_RESULTS" : "ADD_RESULTS",
          payload: {
            mentors,
            total,
          },
        });
        dispatchMentors({
          type: "UPDATE_REQUEST_STATE",
          payload: { error: "", pending: false },
        });
      } catch (e) {
        dispatchMentors({
          type: "UPDATE_REQUEST_STATE",
          payload: {
            error: "Wystąpił błąd podczas pobierania danych.",
            pending: false,
          },
        });
      }
    },
    []
  );

  const location = useLocation();

  useEffect(() => {
    const { state } = location as LocationTypes;
    if (state?.filters) {
      dispatchMentors({
        type: "UPDATE_FILTERS",
        payload: { filters: state.filters },
      });
      dispatchMentors({
        type: "UPDATE_RESULTS",
        payload: {
          mentors: [],
          total: 0,
        },
      });
      dispatchMentors({
        type: "UPDATE_PAGE",
        payload: { page: 1 },
      });
    }
  }, [location]);

  useEffect(() => {
    dispatchMentors({
      type: "UPDATE_REQUEST_STATE",
      payload: { error: "", pending: true },
    });
    const timeoutId = setTimeout(() => {
      searchMore(state.page, state.filters);
    }, SEARCH_DELAY);
    return () => clearTimeout(timeoutId);
  }, [searchMore, state.filters, state.page]);

  useEffect(() => {
    const run = async () => {
      const terms = await fetchTerms();
      dispatchTerms({ type: "UPDATE_TERMS", payload: terms });
    };
    run();
  }, []);

  const handleChangeSortOption = useCallback((value: SortOption) => {
    dispatchMentors({
      type: "UPDATE_FILTERS",
      payload: { filters: { sort: value } },
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    dispatchMentors({
      type: "UPDATE_FILTERS",
      payload: { filters: mentorsInitialState.filters },
    });
    dispatchMentors({
      type: "UPDATE_RESULTS",
      payload: {
        mentors: [],
        total: 0,
      },
    });
    dispatchMentors({
      type: "UPDATE_PAGE",
      payload: { page: 1 },
    });
  }, []);

  const handleRemovePrice = useCallback(() => {
    dispatchMentors({
      type: "UPDATE_FILTERS",
      payload: {
        filters: {
          priceMin: mentorsInitialState.filters.priceMin,
          priceMax: mentorsInitialState.filters.priceMax,
        },
      },
    });
    dispatchMentors({
      type: "UPDATE_RESULTS",
      payload: {
        mentors: [],
        total: 0,
      },
    });
    dispatchMentors({
      type: "UPDATE_PAGE",
      payload: { page: 1 },
    });
  }, []);

  const handleRemoveFilter = useCallback(
    (name: FilterName, opt: Option) => {
      const collection = state.filters[name];
      let newCollection: null | Option[] = null;
      if (Array.isArray(collection)) {
        if (collection.includes(opt)) {
          newCollection = collection.filter((o) => o !== opt);
        } else {
          newCollection = [...collection, opt];
        }
      }
      const initial: Partial<FiltersSelected> = {
        [name]: newCollection || mentorsInitialState.filters[name],
      };
      if (name.includes("price")) {
        initial.priceMin = mentorsInitialState.filters.priceMin;
        initial.priceMax = mentorsInitialState.filters.priceMax;
      }
      dispatchMentors({
        type: "UPDATE_FILTERS",
        payload: { filters: initial },
      });
      dispatchMentors({
        type: "UPDATE_RESULTS",
        payload: {
          mentors: [],
          total: 0,
        },
      });
      dispatchMentors({
        type: "UPDATE_PAGE",
        payload: { page: 1 },
      });
    },
    [state.filters]
  );

  const onChangePhrase = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatchMentors({
        type: "UPDATE_FILTERS",
        payload: { filters: { phrase: e.target.value } },
      });
      dispatchMentors({
        type: "UPDATE_RESULTS",
        payload: {
          mentors: [],
          total: 0,
        },
      });
    },
    []
  );

  const toggleFiltersSidebar = useCallback(() => setPopupOpen((s) => !s), []);

  const handleLoadMore = () => {
    dispatchMentors({
      type: "UPDATE_PAGE",
      payload: { page: state.page + 1 },
    });
  };

  const handleChangeFilter = useCallback(
    (changed: Partial<FiltersSelected>) => {
      dispatchMentors({
        type: "UPDATE_FILTERS",
        payload: { filters: changed },
      });
      dispatchMentors({
        type: "UPDATE_RESULTS",
        payload: {
          mentors: [],
          total: 0,
        },
      });
      dispatchMentors({
        type: "UPDATE_PAGE",
        payload: { page: 1 },
      });
    },
    []
  );

  return (
    <>
      <AppHeader
        title="Znajdź mentora dla siebie"
        text="Przeglądaj profile mentorów i wybierz tego, który spełnia twoje oczekiwania."
      />
      <FiltersPopup
        terms={terms}
        filters={state.filters}
        isOpen={popupOpen}
        handleChange={handleChangeFilter}
        handleClose={toggleFiltersSidebar}
        handleSubmit={toggleFiltersSidebar}
      />
      <Container as={Tag.Header} classes={styles.header}>
        <div className={styles.grid}>
          <FiltersSidebar
            terms={terms}
            filters={state.filters}
            handleChange={handleChangeFilter}
          />
          <div className={styles.main}>
            <FiltersHeader
              error={state.error}
              displayed={state.mentors.length}
              pending={state.pending}
              filters={state.filters}
              total={state.total}
              handleChangeSortOption={handleChangeSortOption}
              handleClearFilters={handleClearFilters}
              handleRemoveFilter={handleRemoveFilter}
              handleRemovePrice={handleRemovePrice}
              onChangePhrase={onChangePhrase}
              toggleFiltersSidebar={toggleFiltersSidebar}
            />
            <MentorsList
              filters={state.filters}
              error={state.error}
              pending={state.pending}
              hasNextPage={state.total > state.mentors.length}
              mentors={state.mentors}
              handleLoadMore={handleLoadMore}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default SearchMentors;
