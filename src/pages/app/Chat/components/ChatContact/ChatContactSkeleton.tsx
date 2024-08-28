import React from "react";

import { Skeleton } from "@mui/material";

import styles from "./ChatContact.module.scss";

export const ChatContactSkeleton = () => {
  return (
    <li>
      <div className={styles.button}>
        <Skeleton variant="circular" width={38} height={38} />
        <div style={{ flexGrow: 2 }}>
          <Skeleton style={{ width: "120px" }} variant="text" />
          <Skeleton style={{ width: "80px" }} variant="text" />
        </div>
        <Skeleton variant="circular" width={20} height={20} />
      </div>
    </li>
  );
};
