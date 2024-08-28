import React from "react";
import clx from "classnames";
import styles from "./Status.module.scss";

type StatusVariant = "success" | "danger" | "warning" | 'info';

type Props = {
  variant: StatusVariant;
  text: string;
  noWrap?: boolean
};

export const Status = ({ noWrap, variant, text }: Props) => {
  return (
    <div
      className={clx(styles.status, {
        [styles.info]: variant === "info",
        [styles.active]: variant === "success",
        [styles.inactive]: variant === "danger",
        [styles.warning]: variant === "warning",
        [styles.noWrap]: !!noWrap,
      })}
    >
      <span>{text}</span>
    </div>
  );
};
