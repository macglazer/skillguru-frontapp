import React, { ReactNode } from "react";
import clx from "classnames";
import styles from "./RadioCard.module.scss";

type Props = {
  className?: string;
  selected?: boolean;
  value?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  title?: ReactNode;
  children?: ReactNode;
};

export const RadioCard = ({
  className,
  selected,
  value,
  name,
  onChange,
  title,
  children,
}: Props) => {
  return (
    <label
      className={clx(
        styles.radioCard,
        {
          [styles.radioCardSelected]: selected,
        },
        className
      )}
    >
      <input
        type="radio"
        value={value}
        name={name}
        checked={selected}
        onChange={onChange}
        className={styles.hiddenInput}
      />
      <div className={styles.radioHeader}>
        <div className={styles.fakeInput} />
        {title && <div className={styles.title}>{title}</div>}
      </div>
      <div className={styles.radioContent}>{children}</div>
    </label>
  );
};
