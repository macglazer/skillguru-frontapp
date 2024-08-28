import React from "react";
import clx from "classnames";
import styles from "./HorizontalTabs.module.scss";

type Props = {
  className?: string;
  isActive?: boolean;
  disabled?: boolean;
  text: string;
  name?: string;
  value?: string;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => void;
};

export const HorizontalTabsButton = ({
  className,
  disabled,
  isActive,
  name,
  value,
  onClick,
  text,
}: Props) => {
  return (
    <button
      className={clx(
        styles.button,
        {
          [styles.active]: isActive,
          [styles.disabled]: disabled,
        },
        className
      )}
      disabled={disabled}
      onClick={onClick}
      value={value}
      name={name}
      type="button"
      role="tab"
    >
      {text}
    </button>
  );
};
