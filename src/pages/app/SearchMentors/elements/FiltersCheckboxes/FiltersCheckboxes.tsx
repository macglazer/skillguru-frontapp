import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Option, FilterName } from "@customTypes/mentor";
import Checkbox, { type CheckboxValueCb } from "src/components/Checkbox/Checkbox";
import styles from './FiltersCheckboxes.module.scss'
import SearchSvg from "@icons/SearchSvg";

type FiltersCheckboxesProps = {
  name: FilterName;
  options: Option[];
  selected: Option[];
  startedRows: number;
  handleChange: (name: FilterName, selected: Option[]) => void;
};

export const FiltersCheckboxes = ({
  name,
  options,
  selected,
  startedRows,
  handleChange,
}: FiltersCheckboxesProps) => {
  const partialyHide = Math.max(options.length - (startedRows - 1), 0);
  const displayAll = partialyHide > 0;
  const [isExpanded, setIsExpanded] = useState<boolean>(displayAll);
  const [phrase, setPhrase] = useState<string>('')

  const handlePhraseChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPhrase(e.target.value)
  }, [])

  const onToggle = useCallback(() => {
    setIsExpanded((s) => !s);
  }, []);

  const handleInputChange = useCallback(
    (value: string, valueOpt: CheckboxValueCb) => {
      const checked = valueOpt.value
      const newSelected = options.filter((opt) => {
        if (value === opt.value) {
          return checked;
        }
        return selected.includes(opt);
      });
      handleChange(name, newSelected);
    },
    [name, options, selected, handleChange]
  );

  const filteredOptions = useMemo(() => {
    return phrase ? options.filter(o => o.label.includes(phrase)) : options
  }, [options, phrase])

  return (
    <div className={styles.wrapper}>
      {options.length > 5 ? (
        <div className={styles.searchWrapper}>
          <SearchSvg />
          <input value={phrase} onChange={handlePhraseChange} /> 
        </div>
      ) : null}
      <div className={styles.checkboxes}>
        {filteredOptions.slice(0, isExpanded ? filteredOptions.length : startedRows - 1).map((opt, i) => (
          <Checkbox
            key={`${opt.value}-${i}`}
            id={name}
            name={opt.value}
            label={opt.label}
            type="checkbox"
            value={selected.includes(opt)}
            valueChangeHandler={handleInputChange}
            classes={styles.checkbox}
            colorVariant='primary'
            fontVariant='button-sm'
          />
        ))}
      </div>
      {!!partialyHide && (
        <button onClick={onToggle} type='button' className={styles.btnMore} >
          {isExpanded ? `- ${partialyHide} ukryj` : `+ ${partialyHide} więcej`}
        </button>
      )}
    </div>
  );
};
