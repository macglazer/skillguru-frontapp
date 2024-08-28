import React, { ReactNode } from "react";
import clx from "classnames";
import styles from "./Dropdown.module.scss";

type DropdownOptionProps = {
  className?: string;
  children?: ReactNode;
  name?: string;
  value?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const DropdownOption = ({
  className,
  children,
  name,
  value,
  onClick,
}: DropdownOptionProps) => {
  return (
    <button
      name={name}
      value={value}
      onClick={onClick}
      className={clx(styles.DropdownOption, className)}
    >
      {children}
    </button>
  );
};
