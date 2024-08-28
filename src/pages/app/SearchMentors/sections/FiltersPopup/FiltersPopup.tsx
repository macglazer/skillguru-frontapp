import React from "react";
import {
  FilterName,
  Terms,
  FiltersSelected,
  Option,
} from "@customTypes/mentor";
import styles from "./FiltersPopup.module.scss";
import Modal from "src/components/Modal/Modal";
import { FiltersCheckboxes, FiltersGroup, FiltersRange } from "../../elements";
import { FILTERS_CHECKBOXES_ROWS_LIMIT } from "../../config";

type Props = {
  terms: Terms;
  filters: FiltersSelected;
  isOpen: boolean;
  handleChange: (filters: Partial<FiltersSelected>) => void;
  handleClose: () => void;
  handleSubmit: () => void;
};

export const FiltersPopup = ({
  terms,
  filters,
  isOpen,
  handleChange,
  handleClose,
  handleSubmit,
}: Props) => {
  return isOpen ? (
    <Modal
      classNameContent={styles.modalContent}
      closeHandler={handleClose}
      title="Filtry"
      className={styles.modal}
    >
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
              });
            }}
          />
        </FiltersGroup>
        <FiltersGroup title="Kategoria">
          <FiltersCheckboxes
            name="categories"
            startedRows={5}
            options={terms.categories}
            selected={filters.categories}
            handleChange={(name: FilterName, selected: Option[]) => {
              handleChange({
                [name]: selected,
              });
            }}
          />
        </FiltersGroup>
        <FiltersGroup title="Umiejętności">
          <FiltersCheckboxes
            name="skills"
            startedRows={5}
            options={terms.skills}
            selected={filters.skills}
            handleChange={(name: FilterName, selected: Option[]) => {
              handleChange({
                [name]: selected,
              });
            }}
          />
        </FiltersGroup>
        <FiltersGroup title="Usługi">
          <FiltersCheckboxes
            name="services"
            startedRows={5}
            options={terms.services}
            selected={filters.services}
            handleChange={(name: FilterName, selected: Option[]) => {
              handleChange({
                [name]: selected,
              });
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
              });
            }}
          />
        </FiltersGroup>
        <div>
          <button
            type="button"
            className={styles.submit}
            onClick={handleSubmit}
          >
            Filtruj
          </button>
        </div>
      </div>
    </Modal>
  ) : null;
};
