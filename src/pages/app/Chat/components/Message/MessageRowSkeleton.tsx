import React from "react";

import { Skeleton } from "@mui/material";

import styles from "./Message.module.scss";

export const MessageRowSkeleton = () => {
  return (
    <>
      <div className={styles.flex}>
        <Skeleton variant="circular" width={28} height={28} />
        <Skeleton
          style={{ width: "220px", height: "40px", borderRadius: "12px" }}
          variant="rectangular"
        />
      </div>
      <div className={styles.message} data-variant="response">
        <Skeleton
          style={{ width: "220px", height: "40px", borderRadius: "12px" }}
          variant="text"
        />
      </div>
    </>
  );
};
