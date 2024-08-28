import React from "react";
import styles from "./SessionsHistory.module.scss";
import { TableCell, TableRow } from "src/components/_base/Table";
import { Skeleton } from "@mui/material";
import { UserIdentity } from "src/components/_base/UserIdentity";

export const SkeletonRow = () => {
  return (
    <TableRow>
      <TableCell flex={4} heading>
        <UserIdentity
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
              style={{ width: "160px" }}
              variant="text"
              sx={{ fontSize: "1em" }}
            />
          }
        />
      </TableCell>
      <TableCell flex={3} heading>
        <Skeleton
          className={styles.name}
          style={{ width: "160px" }}
          variant="text"
          sx={{ fontSize: "1em" }}
        />
      </TableCell>
      <TableCell flex={3} heading>
        <Skeleton
          className={styles.name}
          style={{ width: "160px" }}
          variant="text"
          sx={{ fontSize: "1em" }}
        />
      </TableCell>
      <TableCell flex={3} heading>
        <Skeleton
          className={styles.name}
          style={{ width: "160px" }}
          variant="text"
          sx={{ fontSize: "1em" }}
        />
      </TableCell>
      <TableCell flex={4} heading>
        <Skeleton
          className={styles.name}
          style={{ width: "160px" }}
          variant="text"
          sx={{ fontSize: "1em" }}
        />
      </TableCell>
      <TableCell flex={1} heading></TableCell>
    </TableRow>
  );
};
