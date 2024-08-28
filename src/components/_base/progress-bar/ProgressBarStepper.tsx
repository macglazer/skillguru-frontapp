import React from "react";
import styles from "./ProgressBarStepper.module.scss";
import clx from "classnames";

type Props = {
  className?: string;
  current?: number;
  max: number;
  withPadding?: boolean;
};

export const ProgressBarStepper = ({
  withPadding,
  className,
  current,
  max,
}: Props) => {
  return (
    <div
      className={clx(styles.stepper, {
        [styles.withPadding]: withPadding,
      }, className)}
    >
      {new Array(max).fill(null).map((_, i) => (
        <span key={i} className={clx(styles.step, {
            [styles.active]: current && current > i
        })} />
      ))}
    </div>
  );
};
