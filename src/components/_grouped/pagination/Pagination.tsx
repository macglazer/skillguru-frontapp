// Library
import React from "react";
// Assets
import Arrow from "@icons/Arrow";
// Styles
import styles from "./Pagination.module.scss";
import { generatePagination } from "./generatePagination";
import clx from 'classnames'

interface PaginationProps {
  className?: string
  name?: string;
  current: number;
  last: number;
  fullWidth?: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Pagination = ({ className, name, fullWidth, current, last, onClick }: PaginationProps) => {
  const pages = generatePagination(current, last);

  if (last === 1) return <></>;

  return (
    <div data-test-id="pagination" className={clx(styles.wrapper, {
      [styles.fullWidth]: !!fullWidth,
    }, className)}>
      <button
        type="button"
        name={name}
        value={Math.max(current - 1, 1)}
        onClick={onClick}
        disabled={current === 1}
        className={styles.sideButton}
      >
        <Arrow />
        <span>Poprzednia</span>
      </button>
      <div className={styles.mobilePages}>
        Strona {current} z {last}
      </div>
      <div className={styles.desktopPages}>
        {pages.map((page, i) => (
          <button
            key={`${page}-${i}`}
            type="button"
            name={name}
            value={page || undefined}
            onClick={page ? onClick : undefined}
            disabled={current === page}
            className={styles.pageButton}
          >
            {page || '...'}
          </button>
        ))}
      </div>
      <button
        type="button"
        name={name}
        value={Math.min(current + 1, last)}
        onClick={onClick}
        disabled={current === last}
        className={styles.sideButton}
      >
        <span>Następna</span> <Arrow />
      </button>
    </div>
  );
};
