import { type Review as ReviewType } from "@customTypes/mentor";
import React from "react";
import { Stars } from "../stars";
import { formatDate } from "src/utils";
import clx from "classnames";
import styles from "./Reviews.module.scss";
import { Skeleton } from "@mui/material";

type Props = {
  className?: string;
};

export const ReviewSkeleton = ({ className }: Props) => {
  return (
    <div className={clx(styles.item, className)}>
      <div className={styles.skeleton_row_flex}>
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton variant="circular" width={20} height={20} />
      </div>
      <h5 className={styles.item_title}>
        <Skeleton
          style={{ width: "90px" }}
          variant="text"
          sx={{ fontSize: "1em" }}
        />
      </h5>
      <span className={clx(styles.item_subtitle, styles.skeleton_row_flex)}>
        <Skeleton
          style={{ width: "50px" }}
          variant="text"
          sx={{ fontSize: "1em" }}
        />
        <Skeleton
          style={{ width: "50px" }}
          variant="text"
          sx={{ fontSize: "1em" }}
        />
      </span>
      <div className={styles.item_content}>
        <Skeleton style={{ width: "90%" }} variant="text" />
        <Skeleton style={{ width: "80%" }} variant="text" />
        <Skeleton style={{ width: "85%" }} variant="text" />
        <Skeleton style={{ width: "65%" }} variant="text" />
      </div>
    </div>
  );
};
