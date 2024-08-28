import React from "react";
import clx from "classnames";
import styles from "./Sidebar.module.scss";
import { FC, useState } from "react";
import { SidebarButtonProps } from "./types";
import { getMenuItems } from "../../config";
import { useSelector } from "react-redux";
import { getRole } from "src/redux/selectors/authSelectors";
import { Link, useLocation } from "react-router-dom";
import { HamburgerButton } from "../../elements";
import Logo from "@icons/Logo";
import Help from "@icons/Help";
import Logout from "@icons/Logout";
import { useLogout } from "./hooks";
import Notifications from "../Notifications/Notifications";
import { useLayoutReducer } from "src/reducers/layout";

type Props = {
  defaultOpen?: boolean
}

export const Sidebar = () => {
  // const { isSidebarOpen, handleClose } = useLayout();
  const userFromRedux = useSelector((state: any) => state.auth.user);
  const role: "M" | "S" | "" = useSelector(getRole) || "";
  const { pathname } = useLocation();
  const handleLogout = useLogout();
  const { layoutState, handleClose, handleSwitch } = useLayoutReducer()

  const menuItems = getMenuItems({
    username: userFromRedux.username,
    role,
  }).filter((item) => item.link !== "");

  return (
    <>
      <div
        onClick={handleClose}
        className={clx(styles.shadow, {
          [styles.isSidebarOpen]: layoutState.isSidebarOpen,
        })}
      />

      <div className={clx(styles.quickSidebar)}>
        <div className={clx(styles.list, styles.topItems)}>
          {menuItems.map(({ Icon, ...item }) => (
            <Link
              key={item.id}
              className={styles.btn}
              data-is-current={pathname.includes(item.link)}
              to={item.link}
              title={item.label}
            >
              {/* {Icon && <Icon />} */}
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className={styles.list}>
          <Link className={styles.btn} to="/help">
            <Help />
            <span>Pomoc</span>
          </Link>
          {!!userFromRedux ? (
            <button
              className={styles.btn}
              onClick={handleLogout}
              title="Wyloguj się"
            >
              <Logout />
              <span>Wyloguj się</span>
            </button>
          ) : null}
        </div>
      </div>

      <div
        className={clx(styles.fullSidebar, {
          [styles.fullSidebarOpen]: layoutState.isSidebarOpen,
        })}
      >
        <div className={clx(styles.list, styles.topItems)}>
          {menuItems.map(({ Icon, ...item }) => (
            <Link
              key={item.id}
              className={styles.btn}
              data-is-current={pathname.includes(item.link)}
              to={item.link}
              title={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className={styles.list}>
          <Link className={styles.btn} to="/help">
            <Help />
            <span>Pomoc</span>
          </Link>
          {!!userFromRedux ? (
            <button
              className={styles.btn}
              onClick={handleLogout}
              title="Wyloguj się"
            >
              <Logout />
              <span>Wyloguj się</span>
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};
