import React from "react";
import styles from "./FiltersGroup.module.scss";
import clx from "classnames";

type Props = {
  children: React.ReactNode;
  title: string;
};

export const FiltersGroup = ({
  children,
  title,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div
        className={clx(styles.content)}
      >
        {children}
      </div>
    </div>
  );
};
