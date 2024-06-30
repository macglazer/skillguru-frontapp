import React, { useCallback, useEffect, useRef, useState } from "react";
import clx from "classnames";
import styles from "./MentorSubscriptions.module.scss";
import {
  HorizontalTabs,
  HorizontalTabsButton,
} from "src/components/_base/HorizontalTabs";
import { SubscriptionStatus } from "@customTypes/subscriptions";
import { fetchMentorStudents } from "@services/mentor/fetchMentorStudents.service";
import { FetchMentorStudentsOutput } from "@services/mentor/fetchMentorStudents.types";
import { Table, TableCell, TableRow } from "src/components/_base/Table";
import { Scrollable } from "src/components/_base/Scrollable";
import { Pagination } from "src/components/_grouped";
import { formatDate } from "src/utils";
import { UserIdentity } from "src/components/_base/UserIdentity";
import { CrownIcon } from "@icons/CrownIcon";
import { Status } from "src/components/_base/Status";
import { Loader } from "src/components/_grouped/loader";
import { Tag } from "src/types/tags";
import Container from "src/components/Container/Container";
import SearchSvg from "@icons/SearchSvg";
import { SearchSvg2 } from "@icons/SearchSvg2";
import { SkeletonRow } from "./SkeletonRow";
import {
  OverflowMenu,
  OverflowMenuList,
  OverflowMenuOption,
  OverflowMenuToggle,
} from "src/components/_grouped/overflow-menu";
import { useNavigate } from "react-router-dom";
import Button, { ButtonVariant } from "src/components/Button/Button";

const PER_PAGE = 8;

const renderStatus = (status: SubscriptionStatus) => {
  switch (status) {
    case "awaiting":
      return <Status variant="info" text="Oczekująca" />;
    case "inactive":
      return <Status variant="danger" text="Nieaktywna" />;
    case "suspended":
      return <Status variant="warning" text="Zawieszona" />;
    case "active":
      return <Status variant="success" text="Aktywna" />;
    default:
      return null;
  }
};

export const MentorSubscriptions = () => {
  const [data, setData] = useState<FetchMentorStudentsOutput | null>(null);
  const [page, setPage] = useState<number>(1);
  const [pending, setPending] = useState<boolean>(true);
  const [tab, setTab] = useState<SubscriptionStatus>("awaiting");

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    const btn = e.target as HTMLButtonElement;
    setTab(btn.value as SubscriptionStatus);
  };

  useEffect(() => {
    const fetchData = async () => {
      setPending(true);
      setData(null);
      const data = await fetchMentorStudents({
        take: PER_PAGE,
        skip: PER_PAGE * (page - 1),
        status: tab,
        sortBy: "status",
        sortMethod: "ASC",
      });
      setData(data);
      setPending(false);
    };
    fetchData();
  }, [page, tab]);

  const [overflowMenuIndex, setOverflowMenuIndex] = useState<number | null>(
    null
  );
  const overflowMenuTimeRef = useRef<number>(0);

  const navigate = useNavigate();

  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const id = Number(btn.value);
      const action = btn.name as "suspend" | "cancel";
      if (id && action === "suspend") {
        console.log("Przełóż spotkanie o id: ", id);
        // navigate('/#')
      }
      if (id && action === "cancel") {
        console.log("Odwołaj spotkanie o id: ", id);
        // navigate('/#')
      }
      setOverflowMenuIndex(null);
    },
    [navigate]
  );

  return (
    <Container as={Tag.Section}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Status subskrypcji Twoich studentów</h2>
          <p>
            Jeżeli chcesz zobaczyć historię swoich transakcji, przejdź do{" "}
            <a href="/payments">Raportów.</a>
          </p>
        </div>

        <div className={styles.body}>
          <HorizontalTabs className={styles.tabs}>
            <HorizontalTabsButton
              isActive={tab === "awaiting"}
              text="Oczekujące subskrypcje"
              name=""
              value="awaiting"
              onClick={handleClick}
            />
            <HorizontalTabsButton
              isActive={tab === "active"}
              text="Aktywne subskrypcje"
              name=""
              value="active"
              onClick={handleClick}
            />
            <HorizontalTabsButton
              isActive={tab === "suspended"}
              text="Zawieszone subskrypcje"
              name=""
              value="suspended"
              onClick={handleClick}
            />
            <HorizontalTabsButton
              isActive={tab === "inactive"}
              text="Nieaktywne subskrypcje"
              name=""
              value="inactive"
              onClick={handleClick}
            />
          </HorizontalTabs>

          <Table>
            {pending ? (
              <>
                {new Array(PER_PAGE).fill(null).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </>
            ) : data === null ? (
              <TableRow>
                <TableCell flex>
                  <div className={styles.emptyState}>
                    <div>
                      <SearchSvg2 />
                    </div>
                    <p>Nie znaleziono żadnych aktywnych subskrypcji</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.students.length === 0 ? (
              <div className={styles.alert2}>
                <div className={styles.icon}>
                  <SearchSvg />
                </div>
                <p>Nie znaleziono żadnych aktywnych subskrypcji</p>
              </div>
            ) : (
              <Scrollable minWidth={"980px"}>
                <TableRow heading>
                  <TableCell flex={4} heading text="Student" />
                  <TableCell flex={3} heading text="Data" />
                  <TableCell flex={3} heading text="Status" />
                  <TableCell flex={3} heading text="Rodzaj" />
                  <TableCell flex={3} heading text="Typ" />
                  <TableCell
                    width={tab === "awaiting" ? "184px" : "64px"}
                    heading
                  />
                </TableRow>

                {data.students
                  ? data.students.map((s) => (
                      <TableRow>
                        <TableCell flex={4}>
                          <UserIdentity
                            avatarUrl={s.avatarUrl}
                            avatarSize={40}
                            avatarAlt={s.fullName}
                            title={
                              <span className={styles.userName}>
                                {s.fullName}
                              </span>
                            }
                          />
                        </TableCell>
                        <TableCell flex={3}>
                          {formatDate(s.date, "DD.MM.YYYY")}
                        </TableCell>
                        <TableCell flex={3}>{renderStatus(s.status)}</TableCell>
                        <TableCell flex={3} className={styles.service}>
                          {s.serviceType}
                        </TableCell>
                        <TableCell flex={3}>
                          <div className={styles.isPro}>
                            {s.isPro ? <CrownIcon /> : null}
                            {s.serviceName}
                          </div>
                        </TableCell>
                        <TableCell
                          width={tab === "awaiting" ? "184px" : "64px"}
                          displayOverflow
                          noPadding
                          className={tab === "awaiting" ? "" : styles.dotsCell}
                        >
                          {tab === "awaiting" ? (
                            <Button 
                              href={`/mentor-offer-details/${s.id}`}
                              size="sm"
                              fontVariant="button-md"
                              variant={ButtonVariant.Outline}
                            >
                              Zobacz aplikacje
                            </Button>
                          ) : tab === 'inactive' ? (<OverflowMenuToggle disabled />) :(
                            <OverflowMenu
                              onMouseEnter={() => {
                                overflowMenuTimeRef.current =
                                  new Date().getTime();
                                setOverflowMenuIndex(s.id);
                              }}
                              onMouseLeave={() => {
                                setOverflowMenuIndex(null);
                              }}
                            >
                              <OverflowMenuToggle
                                onClick={() => {
                                  if (
                                    new Date().getTime() -
                                      overflowMenuTimeRef.current >
                                    500
                                  ) {
                                    if (overflowMenuIndex === s.id) {
                                      setOverflowMenuIndex(null);
                                    } else {
                                      setOverflowMenuIndex(s.id);
                                    }
                                  }
                                  overflowMenuTimeRef.current = 0;
                                }}
                                className={styles.dotsToggle}
                              />
                              {s.id === overflowMenuIndex ? (
                                <OverflowMenuList>
                                  <OverflowMenuOption
                                    text="Przełóż spotkanie"
                                    onClick={handleEdit}
                                    name="suspend"
                                    value={String(s.id)}
                                  />
                                  <OverflowMenuOption
                                    text="Odwołaj"
                                    variant="danger"
                                    onClick={handleEdit}
                                    name="cancel"
                                    value={String(s.id)}
                                  />
                                </OverflowMenuList>
                              ) : null}
                            </OverflowMenu>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </Scrollable>
            )}

            {data && data.total ? (
              <TableRow heading borderTop>
                <TableCell flex>
                  <Pagination
                    name="mentor-subscriptions-pagination"
                    current={page}
                    last={Math.ceil(data.total / PER_PAGE)}
                    onClick={(e) => {
                      const btn = e.target as HTMLButtonElement;
                      setPage(Number(btn.value));
                    }}
                    className={styles.pagination}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ) : null}
          </Table>
        </div>
      </div>
    </Container>
  );
};
