import React, {
    ReactNode,
    useCallback,
    useRef,
    useState,
} from "react";
import styles from "./Subscriptions.module.scss";
import {
    HorizontalTabs,
    HorizontalTabsButton,
} from "src/components/_base/HorizontalTabs";
import {SubscriptionStatus} from "@customTypes/subscriptions";
import {Table, TableCell, TableRow} from "src/components/_base/Table";
import {Scrollable} from "src/components/_base/Scrollable";
import {Pagination} from "src/components/_grouped";
import {formatDate} from "src/utils";
import {UserIdentity} from "src/components/_base/UserIdentity";
import {CrownIcon} from "@icons/CrownIcon";
import {Status} from "src/components/_base/Status";
import {Tag} from "src/types/tags";
import Container from "src/components/Container/Container";
import { EmptyState } from "src/components/EmptyState";
import {SkeletonRow} from "./SkeletonRow";
import {
    OverflowMenu,
    OverflowMenuList,
    OverflowMenuOption,
    OverflowMenuToggle,
} from "src/components/_grouped/overflow-menu";
import {useNavigate} from "react-router-dom";
import {useSubscriptionsReducer} from "src/reducers/subscriptions";
import {Skeleton} from "@mui/material";


const PER_PAGE = 5;

const renderStatus = (status: SubscriptionStatus) => {
    switch (status) {
        case "awaiting":
            return <Status variant="info" text="Oczekująca"/>;
        case "inactive":
            return <Status variant="danger" text="Nieaktywna"/>;
        case "suspended":
            return <Status variant="warning" text="Zawieszona"/>;
        case "active":
            return <Status variant="success" text="Aktywna"/>;
        case "rejected":
            return <Status variant="danger" text="Odrzucona"/>;
        default:
            return null;
    }
};

type Props = {
    title?: string;
    subtitle?: ReactNode;
};

export const Subscriptions = ({title, subtitle}: Props) => {
    const sr = useSubscriptionsReducer();

    const {role, tab, pending, errorMessage, page, total, records} = sr.subscriptionsState;

    const handleTabClick = (
        e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
    ) => {
        const btn = e.target as HTMLButtonElement;
        sr.setTab(btn.value as SubscriptionStatus);
    };

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
                console.log(
                    `[Jako ${sr.subscriptionsState.role}] Przełóż spotkanie o id: `,
                    id
                );
                // navigate('/#')
            }
            if (id && action === "cancel") {
                console.log(
                    `[Jako ${sr.subscriptionsState.role}] Odwołaj spotkanie o id: `,
                    id
                );
                // navigate('/#')
            }
            setOverflowMenuIndex(null);
        },
        [navigate, sr]
    );

    return (
        <Container as={Tag.Section} classes={styles.mentorSection}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>

                <div className={styles.body}>
                    <HorizontalTabs className={styles.tabs}>
                        <HorizontalTabsButton
                            isActive={tab === "awaiting"}
                            text="Oczekujące subskrypcje"
                            name=""
                            value="awaiting"
                            onClick={handleTabClick}
                        />
                        <HorizontalTabsButton
                            isActive={tab === "active"}
                            text="Aktywne subskrypcje"
                            name=""
                            value="active"
                            onClick={handleTabClick}
                        />
                        <HorizontalTabsButton
                            isActive={tab === "suspended"}
                            text="Zawieszone subskrypcje"
                            name=""
                            value="suspended"
                            onClick={handleTabClick}
                        />
                        <HorizontalTabsButton
                            isActive={tab === "inactive"}
                            text="Nieaktywne subskrypcje"
                            name=""
                            value="inactive"
                            onClick={handleTabClick}
                        />
                        <HorizontalTabsButton
                            isActive={tab === "rejected"}
                            text="Odrzucone subskrypcje"
                            name=""
                            value="rejected"
                            onClick={handleTabClick}
                        />
                    </HorizontalTabs>

                    <Table>
                        {pending ? (
                            <>
                                {new Array(PER_PAGE).fill(null).map((_, i) => (
                                    <SkeletonRow key={i}/>
                                ))}
                            </>
                        ) : !pending && records && records.length <= 0 ? (
                            <TableRow>
                                <TableCell flex>
                                    <EmptyState text="Nie znaleziono żadnych aktywnych subskrypcji"/>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <Scrollable minWidth={"980px"}>
                                <TableRow heading>
                                    <TableCell flex={4} heading text={role === 'M' ? "Student" : 'Mentor'}/>
                                    <TableCell flex={3} heading text="Data"/>
                                    <TableCell flex={3} heading text="Status"/>
                                    <TableCell flex={3} heading text="Rodzaj"/>
                                    <TableCell flex={3} heading text="Typ"/>
                                    <TableCell
                                        width={tab === "awaiting" ? "171px" : "64px"}
                                        heading
                                    />
                                </TableRow>

                                {records
                                    ? records.map((s) => (
                                        <TableRow key={s.id}>
                                            <TableCell flex={4}>
                                                <UserIdentity
                                                    className={styles.userIdentity}
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
                                                    {s.isPro ? <CrownIcon/> : null}
                                                    {s.serviceName}
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                width={tab === "awaiting" ? "171px" : "64px"}
                                                displayOverflow
                                                noPadding
                                                className={tab === "awaiting" ? "" : styles.dotsCell}
                                            >
                                                {tab === "awaiting" ? (
                                                    <a
                                                        href={`/mentor-offer-details/${s.id}`}
                                                        className={styles.tableBtn}
                                                    >
                                                        Zobacz aplikacje
                                                    </a>
                                                ) : tab === "inactive" && "rejected" ? (
                                                    <OverflowMenuToggle disabled/>
                                                ) : tab === "rejected" ? (
                                                        <OverflowMenuToggle disabled/>
                                                    ) : (
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

                        <TableRow heading borderTop>
                            <TableCell flex>
                                {pending ? (
                                    <div className={styles.PaginationSkeleton}>
                                        <Skeleton
                                            style={{width: "60px"}}
                                            variant="text"
                                            sx={{fontSize: "1em"}}
                                        />
                                        <Skeleton
                                            style={{width: "60px"}}
                                            variant="text"
                                            sx={{fontSize: "1em"}}
                                        />
                                        <Skeleton
                                            style={{width: "60px"}}
                                            variant="text"
                                            sx={{fontSize: "1em"}}
                                        />
                                    </div>
                                ) : (
                                    <Pagination
                                        name="mentor-subscriptions-pagination"
                                        current={page}
                                        last={Math.ceil(total / PER_PAGE)}
                                        onClick={(e) => {
                                            const btn = e.currentTarget as HTMLButtonElement;
                                            sr.updatePage(Number(btn.value));
                                        }}
                                        className={styles.pagination}
                                        fullWidth
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    </Table>
                </div>
            </div>
        </Container>
    );
};
