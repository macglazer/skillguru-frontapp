import React, { FC, MouseEventHandler, ReactNode } from "react";
import styles from "./OverflowMenu.module.scss";
import clx from "classnames";

type Props = {
  children?: ReactNode;
  className?: string;
  variant?: "danger";
  text?: string;
  name?: string 
  value?: string
  LeadingIcon?: FC<{ className?: string }>
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const OverflowMenuOption = ({
  children,
  className,
  text,
  name,
  variant,
  value,
  LeadingIcon,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      name={name}
      value={value}
      className={clx(
        styles.btn,
        {
          [styles.btnDanger]: variant === "danger",
        },
        className
      )}
    > 
      {LeadingIcon ? (<LeadingIcon className={styles.btnLeadingIcon} />) : null}
      {text}
      {children}
    </button>
  );
};
