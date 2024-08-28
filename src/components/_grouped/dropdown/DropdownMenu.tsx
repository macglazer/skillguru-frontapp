import React, { ReactNode, RefObject, useRef } from "react";
import clx from "classnames";
import styles from "./Dropdown.module.scss";
import { useClickOutside } from "src/hooks/useClickOutside";

type DropdownMenuProps = {
  className?: string;
  children?: ReactNode;
  toggleRef?: RefObject<HTMLButtonElement>
  onClickOutside?: (e: MouseEvent|TouchEvent) => void
};

export const DropdownMenu = ({
  className,
  children,
  toggleRef,
  onClickOutside = () => {},
}: DropdownMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside, toggleRef);
  return (
    <div ref={ref} className={clx(styles.DropdownMenu, className)}>
      {children}
    </div>
  );
};
