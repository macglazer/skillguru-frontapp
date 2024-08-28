import React, { FC, ReactNode } from "react";
import Logo from "@icons/Logo";
import styles from "./AuthLayout.module.scss";

type Props = {
  children: ReactNode;
};

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo color="#262B5E" />
      </div>
      <div className={styles.card}>{children}</div>
    </div>
  );
};

export default AuthLayout;
