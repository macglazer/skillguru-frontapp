import React, { MouseEventHandler, ReactNode } from "react";
import styles from "./OverflowMenu.module.scss";
import clx from "classnames";
import { MoreVerticalIcon } from "@icons/MoreVerticalIcon";

type Props = {
  children?: ReactNode;
  className?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  Icon?: React.FC<{ className: string }>
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const OverflowMenuToggle = ({
  disabled,
  children,
  name,
  value,
  className,
  Icon = MoreVerticalIcon,
  onClick,
}: Props) => {
  return (
    <button
      name={name}
      value={value}
      onClick={onClick}
      className={clx(
        styles.toggle,
        {
          [styles.disabled]: disabled,
        },
        className
      )}
    >
      {children} <Icon className={styles.dots} />
    </button>
  );
};
