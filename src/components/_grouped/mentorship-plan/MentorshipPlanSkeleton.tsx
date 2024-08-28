import React from "react";
import styles from "./MentorshipPlan.module.scss";
import clx from "classnames";
import { UserIdentity } from "src/components/_base/UserIdentity";
import { Skeleton } from "@mui/material";

type Props = {
  withUser: boolean;
};

export const MentorshipPlanSkeleton = ({ withUser }: Props) => {
  return (
    <div className={styles.wrapper}>
      {withUser ? (
        <UserIdentity
          noPadding
          fullWidth
          avatar={
            <Skeleton
              className={styles.img}
              variant="circular"
              width={20}
              height={20}
            />
          }
          title={
            <Skeleton
              className={styles.name}
              style={{ width: "75%" }}
              variant="text"
              sx={{ fontSize: "1em" }}
            />
          }
          subtitle={
            <Skeleton
              className={styles.name}
              style={{ width: "75%" }}
              variant="text"
              sx={{ fontSize: "1em" }}
            />
          }
        />
      ) : null}

      <div className={styles.rows}>
        <Skeleton
          className={styles.name}
          style={{ width: "160px" }}
          variant="text"
          sx={{ fontSize: "2em" }}
        />
        <div className={clx(styles.row, styles.priceRow)}>
          <span className={styles.textCurrency}>
            <Skeleton
              style={{ width: "40px" }}
              variant="text"
              sx={{ fontSize: "2em" }}
            />
          </span>
          <span>
            <Skeleton style={{ width: "100px" }} variant="text" />
          </span>
        </div>

        <h6 className={styles.subtitle}>
          <Skeleton style={{ width: "100px" }} variant="text" />
        </h6>

        {new Array(3).fill(null).map((_, i) => (
          <div className={clx(styles.row)} key={i}>
            <Skeleton
              className={styles.img}
              variant="circular"
              width={12}
              height={12}
            />
            <div>
              <Skeleton
                className={styles.text}
                style={{ width: "160px" }}
                variant="text"
                sx={{ fontSize: "1em" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
