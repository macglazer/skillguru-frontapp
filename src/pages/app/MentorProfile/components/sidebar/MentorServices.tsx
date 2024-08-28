import { ServiceType } from "@customTypes/order";
import React from "react";
import clx from "classnames";
import styles from "./Sidebar.module.scss";

type Props = {
  activeTab: ServiceType;
  handleSwitchTab: () => void;
  children: React.ReactNode;
};

export const MentorServices = ({
  children,
  activeTab,
  handleSwitchTab,
}: Props) => {
  return (
    <div className={clx(styles.sidebar_wrapper, styles.border)}>
      <div className={styles.tabs}>
        <button
          onClick={handleSwitchTab}
          className={clx(styles.tab, {
            [styles.tabActive]: activeTab === "session",
          })}
        >
          Sesje
        </button>
        <button
          onClick={handleSwitchTab}
          className={clx(styles.tab, {
            [styles.tabActive]: activeTab === "mentoring",
          })}
        >
          Mentoring
        </button>
      </div>
      {children}
    </div>
  );
};
