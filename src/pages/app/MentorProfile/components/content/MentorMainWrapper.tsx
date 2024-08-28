import React from "react";
import styles from "./MentorContent.module.scss";

type Props = {
  children: React.ReactNode
};

export const MentorMainWrapper = ({ children }: Props) => {
  return (
    <div className={styles.MentorMainWrapper}>
      {children}
    </div>
  );
};
