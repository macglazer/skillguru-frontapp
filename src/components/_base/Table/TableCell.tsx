import React from 'react';
import clx from 'classnames';
import styles from './styles.module.scss';
import { ReactNode } from 'react';

interface TableListCellProps {
  align?: 'left' | 'center' | 'right';
  children?: ReactNode;
  className?: string;
  flex?: boolean | 'none' | number;
  index?: number;
  displayOverflow?: boolean;
  text?: string
  heading?: boolean
  noPadding?: boolean
  primary?: boolean
  width?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const TableCell = ({
  align = 'left',
  children,
  className,
  flex = false,
  index,
  displayOverflow = false,
  text,
  heading,
  primary,
  width,
  noPadding,
  onClick,
}: TableListCellProps) => {
  const style: Record<string, string | number> = {};

  if (typeof flex === 'number') {
    style.flex = flex;
  }

  if(width){
    style.width = width;
  }
  
  return (
    <div
      data-index={index}
      onClick={onClick}
      style={Object.keys(style).length ? style : undefined}
      className={clx(
        styles.Cell,
        {
          [styles.Cell_AlignLeft]: align === 'left',
          [styles.Cell_AlignCenter]: align === 'center',
          [styles.Cell_AlignRight]: align === 'right',
          [styles.Cell_Flex]: flex === true || flex === 1,
          [styles.Cell_NoFlex]: flex === false || flex === 'none',
          [styles.Clickable]: !!onClick,
          [styles.DisplayOverflow]: displayOverflow,
          [styles.heading]: heading,
          [styles.primary]: primary,
          [styles.noPadding]: noPadding,          
        },
        className,
      )}
    >
      {text || children}
    </div>
  );
};
