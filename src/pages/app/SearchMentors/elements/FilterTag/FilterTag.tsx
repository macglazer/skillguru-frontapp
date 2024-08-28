import React from "react";
import styles from "./FilterTag.module.scss";
import clx from "classnames";
import CloseSmallSvg from "@icons/CloseSmallSvg";

type Props = {
  text: string;
  variant?: "clear";
  handleClick?: () => void;
  handleRemove?: () => void;
};

export const FilterTag = ({
  text,
  variant,
  handleClick,
  handleRemove,
}: Props) => {
  return (
    <button
      className={clx(styles.tag, {
        [styles.clear]: variant === "clear",
      })}
      type="button"
      onClick={handleClick}
    >
      {text}
      {handleRemove && <CloseSmallSvg onClick={handleRemove} />}
    </button>
  );
};
