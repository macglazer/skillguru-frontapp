import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import styles from "./SessionsHistory.module.scss";
import { fetchMentorSessions } from "@services/mentor/fetchMentorSessions.service";
import { PER_PAGE, useSessionsReducer } from "src/reducers/sessions";
import { Table, TableCell, TableRow } from "src/components/_base/Table";
import { Pagination } from "src/components/_grouped";
import { formatDate } from "src/utils";
import { Status } from "src/components/_base/Status";
import { useNavigate } from "react-router-dom";
import { SkeletonRow } from "./SkeletonRow";
import { SearchSvg2 } from "@icons/SearchSvg2";
import { Skeleton } from "@mui/material";
import { UserIdentity } from "src/components/_base/UserIdentity";

type Props = {
  title?: string;
  subtitle?: ReactNode;
  getProfileLink: (id: number) => string;
};

export const SessionsHistory = ({
  title = "Historia Twoich sesji",
  subtitle,
  getProfileLink,
}: Props) => {
  const sr = useSessionsReducer();
  const sessions = sr.sessionsState.sessions;
  const totalPages = Math.ceil(sr.sessionsState.totalRecords / PER_PAGE);
  const navigate = useNavigate();

  const handlePagination = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget as HTMLButtonElement;
      if (!!btn.value && sr.sessionsState.page !== Number(btn.value)) {
        sr.updatePage(Number(btn.value));
      }
    },
    [sr]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>

      <Table className={styles.table}>
        <TableRow heading>
          <TableCell flex={4} heading text="Mentor" />
          <TableCell flex={3} heading text="Data" />
          <TableCell flex={3} heading text="Status" />
          <TableCell flex={3} heading text="Rodzaj" />
          <TableCell flex={4} heading text="Typ" />
        </TableRow>

        {sr.sessionsState.pending ? (
          <>
            {new Array(PER_PAGE).fill(null).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
            <TableRow borderTop>
              <TableCell flex>
                <div className={styles.PaginationSkeleton}>
                  <Skeleton
                    style={{ width: "60px" }}
                    variant="text"
                    sx={{ fontSize: "1em" }}
                  />
                  <Skeleton
                    style={{ width: "60px" }}
                    variant="text"
                    sx={{ fontSize: "1em" }}
                  />
                  <Skeleton
                    style={{ width: "60px" }}
                    variant="text"
                    sx={{ fontSize: "1em" }}
                  />
                </div>
              </TableCell>
            </TableRow>
          </>
        ) : sessions && sessions.length ? (
          <>
            {sessions
              ? sessions.map((s) => (
                  <TableRow
                    key={s.id}
                    onClick={() => {
                      navigate(getProfileLink(s.id));
                    }}
                  >
                    <TableCell flex={4}>
                      <UserIdentity
                        avatarUrl={s.avatarUrl}
                        avatarAlt={s.fullName}
                        avatarSize={40}
                        title={s.fullName}
                      />
                    </TableCell>
                    <TableCell flex={3}>
                      {formatDate(s.date, "DD.MM.YYYY")}
                    </TableCell>
                    <TableCell flex={3}>
                      {s.status === "planned" ? (
                        <Status noWrap variant="warning" text="Zaplanowane" />
                      ) : s.status === "cancelled" ? (
                        <Status noWrap variant="danger" text="Odwołana" />
                      ) : s.status === "in-progress" ? (
                        <Status noWrap variant="success" text="W trakcie" />
                      ) : null}
                    </TableCell>
                    <TableCell flex={3} className={styles.capitalize}>
                      {s.serviceType}
                    </TableCell>
                    <TableCell flex={4}>{s.serviceName}</TableCell>
                  </TableRow>
                ))
              : null}

            <TableRow heading>
              <TableCell flex width="100%">
                <Pagination
                  name="home-sessions-pagination"
                  current={sr.sessionsState.page}
                  last={totalPages}
                  fullWidth
                  onClick={handlePagination}
                />
              </TableCell>
            </TableRow>
          </>
        ) : (
          <TableRow>
            <TableCell flex>
              <div className={styles.emptyState}>
                <div>
                  <SearchSvg2 />
                </div>
                <p>Nie znaleziono żadnych Twoich sesji</p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </Table>
    </div>
  );
};
