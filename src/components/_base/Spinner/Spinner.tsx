import React from "react";
import clx from "classnames";
import styles from "./Spinner.module.scss";

export type SpinnerSize = "sm" | "md" | "lg" | "full"; 

type SpinnerProps = {
  size?: SpinnerSize
  light?: boolean
};

export const Spinner = ({ light, size = "md" }: SpinnerProps) => {
  return (
    <div
      className={clx(styles.spinner, {
        [styles[size]]: !!size,
        [styles.light]: !!light,
      })}
    />
  );
};
