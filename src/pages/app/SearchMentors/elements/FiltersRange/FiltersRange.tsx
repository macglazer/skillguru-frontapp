import React from "react";
import clx from "classnames";
import styles from "./FiltersRange.module.scss";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { rangeValueParser } from "../../utils/rangeValueParser";

type Props = {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  handleChange: (min: number, max: number) => void;
};

export const FiltersRange = ({
  min,
  max,
  valueMin,
  valueMax,
  handleChange,
}: Props) => {
  const _handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value } = target
    const parsedValue = rangeValueParser(min, max)(name === 'priceMin' ? 'min' : 'max', value, valueMin, valueMax)
    
    if(name === 'priceMin'){
      handleChange(parsedValue, valueMax)
    }
    if(name === 'priceMax'){
      handleChange(valueMin, parsedValue)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={clx(styles.row, styles.cols)}>
        <div className={styles.col}>
          <span className={styles.label}>Min</span>
          <input
            name='priceMin'
            className={styles.input}
            min={min}
            max={Math.min(max, valueMax)}
            type="text"
            value={`$${valueMin}`}
            onChange={_handleInputChange}
          />
        </div>
        <div className={styles.col}>
          <span className={styles.label}>Max</span>
          <input
            name='priceMax'
            className={styles.input}
            min={Math.max(valueMin, min)}
            max={max}
            type="text"
            value={`$${valueMax}`}
            onChange={_handleInputChange}
          />
        </div>
      </div>
      <div className={styles.row}>
        <RangeSlider
          className={styles.range}
          min={min}
          max={max}
          step={1}
          defaultValue={[min, max]}
          value={[valueMin, valueMax]}
          onInput={(values: [number, number]) =>
            handleChange(values[0], values[1])
          }
        />
      </div>
    </div>
  );
};
