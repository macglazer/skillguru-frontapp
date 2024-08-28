import React, { ReactNode } from "react";
import clx from "classnames";
import styles from "./LinksList.module.scss";
import { WarningIcon2 } from "@icons/WarningIcon2";

type Props = {
  title?: string;
  className?: string;
  children?: ReactNode;
};

export const LinksList = ({ title, className, children }: Props) => {
  return (
    <div className={clx(styles.wrapper, className)}>
      {title ? (
        <h4 className={styles.title}>
          <WarningIcon2 className={styles.icon}/>
          {title}
        </h4>
      ) : null}
      {children ? (
        <ul className={styles.list}>
          {React.Children.toArray(children).map((l) => (
            <li>{l}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
