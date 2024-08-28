import React, { ReactNode } from "react";
import clx from "classnames";
import styles from "./Dropdown.module.scss";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownOption } from "./DropdownOption";
import { DropdownToggle } from "./DropdownToggle";

type DropdownProps = {
  className?: string;
  children?: ReactNode;
};

export const Dropdown = ({ className, children }: DropdownProps) => {
  return <div className={clx(styles.Dropdown, className)}>{children}</div>;
};

Dropdown.Menu = DropdownMenu
Dropdown.Option = DropdownOption
Dropdown.Toggle = DropdownToggle
