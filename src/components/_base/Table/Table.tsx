import React from 'react';
import clx from 'classnames';
import styles from './styles.module.scss';
import { ReactNode } from 'react';

interface TableListProps {
  className?: string;
  testId?: string;
  children?: ReactNode;
  minWidth?: string
}

export const Table = ({ minWidth, className, children, testId }: TableListProps) => {
  return (
    <div style={{ minWidth }} className={clx(styles.Table, className)} data-test-id={testId}>
      {children}
    </div>
  );
};
