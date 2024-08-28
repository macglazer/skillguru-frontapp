import React from "react";
import styles from "./MentorHeader.module.scss";

type Props = {
  children?: React.ReactNode;
};

export const MentorHeaderWrapper = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <img
        className={styles.bg}
        alt="Mentor Banner Bg"
        src="/images/header-banner-bg.jpg"
      />
      {children}
    </div>
  );
};
