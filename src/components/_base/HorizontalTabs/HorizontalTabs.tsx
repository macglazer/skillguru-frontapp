import React, { ReactNode } from "react";
import clx from "classnames";
import styles from "./HorizontalTabs.module.scss";

type Props = {
  children?: ReactNode;
  className?: string;
};

export const HorizontalTabs = ({ className, children }: Props) => {
  return (
    <div className={clx(styles.wrapper, className)}>
      <div className={clx(styles.tabs)} role="tablist">
        {children}
      </div>
    </div>
  );
};
