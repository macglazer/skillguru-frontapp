import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./SessionsHistory.module.scss";
import { getMentorMeetingHistory } from "@services/mentor/fetchMentorSessions.service";
import { PER_PAGE, useSessionsReducer } from "src/reducers/sessions";
import { Table, TableCell, TableRow } from "src/components/_base/Table";
import { Pagination } from "src/components/_grouped";
import { formatDate } from "src/utils";
import { Status } from "src/components/_base/Status";
import { SkeletonRow } from "./SkeletonRow";
import { Skeleton } from "@mui/material";
import { UserIdentity } from "src/components/_base/UserIdentity";
import { Scrollable } from "src/components/_base/Scrollable";
import { EmptyState } from "src/components/EmptyState";

import { getRole } from "src/redux/selectors/authSelectors";

type Props = {
  title?: string;
  subtitle?: ReactNode;
  getProfileLink: (username: string) => string;
};

export const SessionsHistory = ({
  title = "Historia Twoich sesji",
  subtitle,
  getProfileLink,
}: Props) => {
  const role = useSelector(getRole);
  const sr = useSessionsReducer();
  const sessions = sr.sessionsState.sessions;
  const totalPages = Math.ceil(sr.sessionsState.totalRecords / PER_PAGE);


  const [overflowMenuIndex, setOverflowMenuIndex] = useState<number | null>(
    null
  );

  const handleEdit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget as HTMLButtonElement;
    const id = Number(btn.value);
    const action = btn.name as "suspend" | "cancel";
    if (id && action === "suspend") {
      console.log("Przełóż spotkanie o id: ", id);
    }
    if (id && action === "cancel") {
      console.log("Odwołaj spotkanie o id: ", id);
    }
    setOverflowMenuIndex(null);
  }, []);

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
        <Scrollable minWidth="920px">
          <TableRow heading>
            <TableCell
              flex={4}
              heading
              text={role === "M" ? "Mentee" : "Mentor"}
            />
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
                ? sessions.map((s, ind) => (
                    <TableRow
                      key={`${s.id}-${ind}`}
                      onClick={() => {
                        navigate(getProfileLink(s.username));
                      }}
                    >
                      <TableCell flex={4}>
                        <UserIdentity 
                          className={styles.userIdentity}
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
                <EmptyState text="Nie znaleziono żadnych Twoich sesji" />
              </TableCell>
            </TableRow>
          )}
        </Scrollable>
      </Table>
    </div>
  );
};
