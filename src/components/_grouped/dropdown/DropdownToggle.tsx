import React, { ReactNode, Ref } from "react";
import clx from "classnames";
import styles from "./Dropdown.module.scss";

type DropdownToggleProps = {
  className?: string;
  children?: ReactNode;
  name?: string;
  toggleRef?: Ref<HTMLButtonElement>
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const DropdownToggle = ({
  className,
  children,
  name,
  toggleRef,
  onClick,
}: DropdownToggleProps) => {
  return (
    <button
      onClick={onClick}
      name={name}
      type="button"
      className={clx(styles.DropdownToggle, className)}
      ref={toggleRef}
    >
      {children}
    </button>
  );
};
