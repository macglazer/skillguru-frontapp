import React from "react";
import clx from "classnames";
import styles from "./HamburgerButton.module.scss";
import { useLayoutReducer } from "src/reducers/layout";

type Props = {
  className?: string;
};

export const HamburgerButton = ({ className }: Props) => {
  const { layoutState, handleClose, handleSwitch } = useLayoutReducer()

  return (
    <button
      onClick={handleSwitch}
      className={clx(
        styles.navbarButton,
        {
          [styles.navbarButtonOpen]: layoutState.isSidebarOpen,
        },
        className
      )}
      aria-label="menu"
    >
      <span></span>
      <span></span>
    </button>
  );
};
