import React from "react";
import { SearchSvg2 } from "@icons/SearchSvg2";
import styles from "./EmptyState.module.scss";
import clx from 'classnames';

export const EmptyState = ({ text, className }: { text: string, className?: string }) => {
  return (
    <div className={clx(styles.emptyState, className)}>
      <div>
        <SearchSvg2 />
      </div>
      <p>{text}</p>
    </div>
  );
};
