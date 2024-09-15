import React from "react";
import clx from "classnames";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

// import { SidebarButtonProps } from "./types";
import { getMenuItems } from "../../config";

import { HamburgerButton } from "../../elements";
import Logo from "@icons/Logo";
import Help from "@icons/Help";
import Logout from "@icons/Logout";
import { useLayoutReducer } from "src/reducers/layout";
import { Tooltip, TooltipProps, useMediaQuery } from "@mui/material";
import { ReactComponent as ChevronIcon } from "src/assets/icons/svg/chevron_up.svg";
import Button, { ButtonTag, ButtonVariant } from "src/components/Button/Button";
import CreateSchedules from "@icons/CreateSchedules";
import { SearchMentorsSvg } from "@icons/SearchMentors";
import Home from "@icons/Home";

import styles from "./Sidebar.module.scss";

import { getRole } from "src/redux/selectors/authSelectors";
import { useLogout } from "./hooks";
import paths from "src/paths";

const commonTooltipProps: Partial<TooltipProps> = {
  placement: "left",
  arrow: true,
  classes: {
    tooltip: styles.tooltip,
    arrow: styles.tooltipArrow,
  },
  slotProps: {
    popper: {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ],
    },
  },
};

export const Sidebar = () => {
  // const { isSidebarOpen, handleClose } = useLayout();
  const userFromRedux = useSelector((state: any) => state.auth.user);
  const role: "M" | "S" | "" = useSelector(getRole) || "";
  const { pathname } = useLocation();
  const handleLogout = useLogout();
  const { layoutState, handleSwitch } = useLayoutReducer();
  const isMobile = useMediaQuery("(max-width: 575px)");
  const onLogout = () => {
    if (isMobile) handleSwitch();
    handleLogout();
  };

  const menuItems = getMenuItems({
    username: userFromRedux?.username,
    role,
  }).filter((item) => item.link !== "");

  return (
    <div
      className={clx(styles.fullSidebar, {
        [styles.fullSidebarOpen]: layoutState.isSidebarOpen,
      })}
    >
      <button className={styles.arrow} onClick={handleSwitch}>
        <ChevronIcon />
      </button>
      <div className={styles.logo}>
        <div onClick={isMobile ? undefined : handleSwitch}>
          <Logo
            collapsed={!layoutState.isSidebarOpen}
            width="108"
            className={styles.navbarLogoIcon}
          />
        </div>
        {isMobile && <HamburgerButton className={styles.hamburger} />}
      </div>
      <div className={clx(styles.list, styles.topItems)}>
        {userFromRedux &&
          menuItems.map(({ Icon, ...item }) => (
            <Tooltip
              key={item.id}
              title={layoutState.isSidebarOpen ? "" : item.label}
              {...commonTooltipProps}
            >
              <Link
                onClick={isMobile ? handleSwitch : undefined}
                className={styles.btn}
                data-is-current={pathname.includes(item.link)}
                to={item.link}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </Tooltip>
          ))}
        {!userFromRedux ? (
          <>
            <Tooltip
              title={layoutState.isSidebarOpen ? "" : "Strona główna"}
              {...commonTooltipProps}
            >
              <a
                onClick={isMobile ? handleSwitch : undefined}
                className={styles.btn}
                href="http://www.skillgu.com"
              >
                <Home />
                <span>Strona główna</span>
              </a>
            </Tooltip>
            <Tooltip
              title={layoutState.isSidebarOpen ? "" : "Znajdź mentora"}
              {...commonTooltipProps}
            >
              <Link
                onClick={isMobile ? handleSwitch : undefined}
                className={styles.btn}
                to="/search-mentors"
                data-is-current={pathname.includes("search-mentors")}
              >
                <SearchMentorsSvg />
                <span>Znajdź mentora</span>
              </Link>
            </Tooltip>
            <Tooltip
              title={layoutState.isSidebarOpen ? "" : "Pomoc"}
              {...commonTooltipProps}
            >
              <Link
                onClick={isMobile ? handleSwitch : undefined}
                className={styles.btn}
                to="/help"
                data-is-current={pathname.includes("help")}
              >
                <Help />
                <span>Pomoc</span>
              </Link>
            </Tooltip>
            <div className={styles.btnBox}>
              <Tooltip
                title={layoutState.isSidebarOpen ? "" : "Zaloguj się"}
                {...commonTooltipProps}
              >
                <Button
                  onClick={isMobile ? handleSwitch : undefined}
                  as={ButtonTag.InternalLink}
                  href={paths.login}
                  variant={
                    layoutState.isSidebarOpen
                      ? ButtonVariant.Primary
                      : ButtonVariant.Transparent
                  }
                  classes={clx(
                    styles.btn,
                    layoutState.isSidebarOpen ? styles.btnLogin : ""
                  )}
                >
                  {layoutState.isSidebarOpen ? <span></span> : <Logout />}
                  <span>Zaloguj się</span>
                </Button>
              </Tooltip>
              <Tooltip
                title={layoutState.isSidebarOpen ? "" : "Zostań mentorem"}
                {...commonTooltipProps}
              >
                <Button
                  onClick={isMobile ? handleSwitch : undefined}
                  as={ButtonTag.InternalLink}
                  variant={ButtonVariant.Transparent}
                  href={paths.registerMentor}
                  classes={clx(
                    styles.btn,
                    layoutState.isSidebarOpen ? styles.btnRegister : ""
                  )}
                >
                  {layoutState.isSidebarOpen ? (
                    <span></span>
                  ) : (
                    <CreateSchedules />
                  )}
                  <span>Zostań mentorem</span>
                </Button>
              </Tooltip>
            </div>
          </>
        ) : null}
      </div>

      {!!userFromRedux ? (
        <div className={styles.list}>
          <Tooltip
            title={layoutState.isSidebarOpen ? "" : "Pomoc"}
            {...commonTooltipProps}
          >
            <Link
              onClick={isMobile ? handleSwitch : undefined}
              className={styles.btn}
              to="/help"
            >
              <Help />
              <span>Pomoc</span>
            </Link>
          </Tooltip>

          <Tooltip
            title={layoutState.isSidebarOpen ? "" : "Wyloguj się"}
            {...commonTooltipProps}
          >
            <button className={styles.btn} onClick={onLogout}>
              <Logout />
              <span>Wyloguj się</span>
            </button>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
};
