import React, { useCallback, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import clx from "classnames";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Button, { ButtonVariant } from "src/components/Button/Button";
import { ClientPortal } from "src/components/portal";
import Container from "src/components/Container/Container";
import Modal from "src/components/Modal/Modal";
import { PlanName } from "src/components/_base/PlanName";
import { Status } from "src/components/_base/Status";
import { Text } from "src/components/typography";
import { UserIdentity } from "src/components/_base/UserIdentity";
import { MentorshipFeedbackModal } from "../mentorship-feedback/MentorshipFeedbackModal";
import { Skeleton, Typography } from "@mui/material";
import { ArrowLongRight } from "@icons/ArrowLongRight";

import { SubscriptionPlan } from "@customTypes/order";
import { SubscriptionStatus } from "@customTypes/subscriptions";
import { Tag } from "src/types/tags";

import styles from "./Subscriptions.module.scss";

import { formatDate } from "src/utils";
import { cancelMentorship } from "@services/mentorship/cancelMentorship";
import { suspendMentorship } from "@services/mentorship/suspendMentorship";
import { restoreMentorship } from "@services/mentorship/restoreMentorship";
import { fetchStudentMentors } from "@services/mentee/fetchStudentMentors.service";
import { FetchStudentMentorsOutput } from "@services/mentee/fetchStudentMentors.types";

const PER_PAGE = 5;

type Props = {
  title?: string;
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1060,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 560,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

type MentorShort = {
  id: number;
  fullName: string;
  plan: SubscriptionPlan;
  paidUntil: string;
};

export const StudentMentors = ({ title }: Props) => {
  const [data, setData] = useState<null | FetchStudentMentorsOutput>(null);
  const [pending, setPending] = useState<boolean>(true);
  const pageRef = useRef<number>(0);
  const [suspending, setSuspending] = useState<MentorShort | null>(null);
  const [cancelling, setCancelling] = useState<MentorShort | null>(null);
  const [confirmed, setConfirmed] = useState<MentorShort | null>(null);
  const [cancelled, setCancelled] = useState<MentorShort | null>(null);
  const [restoring, setRestoring] = useState<MentorShort | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudentMentors({
        take: PER_PAGE,
        skip: PER_PAGE * (pageRef.current - 1),
      });
      setData(data);
      setPending(false);
    };
    if (pageRef.current === 0) {
      pageRef.current = 1;
      fetchData();
    }
  }, []);

  const handleCanceling = () => {
    const c = cancelling ? { ...cancelling } : ({} as MentorShort);
    setConfirmed(c);
    setCancelling(null);
  };

  const handleCancelConfirm = useCallback(async () => {
    const c = confirmed ? { ...confirmed } : ({} as MentorShort);
    await cancelMentorship(c.id);
    setCancelled(c);
    setConfirmed(null);
  }, [confirmed]);

  const handleSuspendConfirm = useCallback(async () => {
    if (!suspending) {
      return;
    }
    await suspendMentorship(suspending?.id);
    setSuspending(null);
  }, [suspending]);

  const handleRestoreConfirm = useCallback(async () => {
    if (!restoring) {
      return;
    }
    await restoreMentorship(restoring?.id);
    setRestoring(null);
  }, [restoring]);

  return (
    <>
      <ClientPortal selector="modal-root">
        {cancelling ? (
          <Modal
            className={styles.modal}
            classNameContent={styles.box}
            title={`Czy jesteś pewny, że chcesz anulować swój plan z ${cancelling.fullName}?`}
            closeHandler={() => setCancelling(null)}
          >
            {cancelling.paidUntil && (
              <Text classes={styles.info}>
                Dostęp do funkcji premium będziesz miał jeszcze do{" "}
                {formatDate(cancelling.paidUntil, "DD MMMM YYYY")} roku.
              </Text>
            )}
            <div className={styles.btnBox}>
              <Button
                classes={styles.mainBtn}
                variant={ButtonVariant.Transparent}
                onClick={handleCanceling}
                fullWidth
              >
                Tak, zakończ subskrypcję
              </Button>
              <Button
                variant={ButtonVariant.Light}
                onClick={() => setCancelling(null)}
                fullWidth
              >
                Nie, jeszcze nie
              </Button>
            </div>
          </Modal>
        ) : null}
        {suspending ? (
          <Modal
            className={styles.modal}
            classNameContent={styles.box}
            title={`Czy jesteś pewny, że chcesz zawiesić swój plan z ${suspending.fullName}?`}
            closeHandler={() => setSuspending(null)}
          >
            <div>
              {suspending.paidUntil && (
                <Text classes={styles.info}>
                  Dostęp do funkcji premium będziesz miał jeszcze do{" "}
                  {formatDate(suspending.paidUntil, "DD MMMM YYYY")} roku.
                </Text>
              )}
            </div>
            <div className={styles.btnBox}>
              <Button
                classes={styles.mainBtn}
                variant={ButtonVariant.Transparent}
                onClick={handleSuspendConfirm}
                fullWidth
              >
                Tak, zawieś subskrypcję
              </Button>
              <Button
                onClick={() => setSuspending(null)}
                variant={ButtonVariant.Light}
                fullWidth
              >
                Nie, jeszcze nie
              </Button>
            </div>
          </Modal>
        ) : null}
        {confirmed ? (
          <Modal
            className={styles.modal}
            classNameContent={styles.box}
            title={`Anulowałeś swój plan Pro z ${confirmed.fullName}?`}
            closeHandler={() => setConfirmed(null)}
          >
            <Text classes={styles.info}>
              Przykro nam, że odchodzisz! Zawsze możesz wznowić swoją
              subskrypcję.
            </Text>

            <div className={styles.btnBox}>
              <Button
                classes={styles.mainBtn}
                variant={ButtonVariant.Transparent}
                onClick={()=>setConfirmed(null)}
                fullWidth
              >
                Wznów subskrypcję
              </Button>
              <Button
                variant={ButtonVariant.Light}
                onClick={handleCancelConfirm}
                fullWidth
              >
                Wyjdź
              </Button>
            </div>
          </Modal>
        ) : null}
        {restoring ? (
          <Modal
            className={styles.modal}
            classNameContent={styles.box}
            title={`Wznów subskrypcję z ${restoring.fullName}`}
            closeHandler={() => setRestoring(null)}
          >
            <Text classes={styles.info}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus impedit atque numquam cum possimus vel?</Text>

            <div className={styles.btnBox}>
              <Button
                classes={styles.mainBtn}
                variant={ButtonVariant.Transparent}
                onClick={handleRestoreConfirm}
                fullWidth
              >
                Wznów subskrypcję
              </Button>
              <Button
                variant={ButtonVariant.Light}
                onClick={() => setRestoring(null)}
                fullWidth
              >
                Anuluj
              </Button>
            </div>
          </Modal>
        ) : null}
        {cancelled ? (
          <MentorshipFeedbackModal
            mentorshipId={cancelled.id}
            handleClose={() => setCancelled(null)}
          />
        ) : null}
      </ClientPortal>

      <Container as={Tag.Section}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2>{title}</h2>
          </div>

          <div className={styles.body}>
            {pending ? (
              <Slider {...settings} className={styles.slick}>
                {new Array(PER_PAGE).fill(null).map((_, i) => (
                  <div key={i} className={styles.slickItem}>
                    <div className={styles.card}>
                      <UserIdentity
                        avatar={
                          <Skeleton
                            className={styles.img}
                            variant="circular"
                            width={56}
                            height={56}
                          />
                        }
                        title={
                          <Skeleton style={{ width: "90%" }} variant="text" />
                        }
                        subtitle={
                          <Skeleton style={{ width: "90%" }} variant="text" />
                        }
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            ) : null}
            {!pending &&
            data?.total &&
            data.mentors &&
            data.mentors.length > 0 ? (
              <Slider {...settings} className={styles.slick}>
                {data.mentors.map((m) => (
                  <div key={m.id} className={styles.studentMentorSlickItem}>
                    <div className={styles.studentMentorCard}>
                      <div>
                        <UserIdentity
                          className={styles.userIdentity}
                          avatarSize={56}
                          avatarAlt={m.fullName}
                          avatarUrl={m.avatarUrl}
                          title={
                            <Typography variant="buttonLg" color="secondary">
                              {m.fullName}
                            </Typography>
                          }
                          subtitle={
                            <a
                              className={styles.profileLink}
                              href={`/mentor/${m.id}`}
                            >
                              Zobacz profil
                              <ArrowLongRight />
                            </a>
                          }
                        />
                        <PlanName
                          plan={m.plan}
                          pillBg
                          className={styles.planPill}
                        />
                      </div>
                      <div className={styles.hr} />
                      {m.status === "awaiting" ? (
                        <>
                          <div className={styles.cardStatus}>
                            <Status text="Aplikacja w toku" variant="warning" />
                            <p>
                              Jeżeli zostanie zaakceptowana, poprosimy Cię o
                              wybranie terminów.
                            </p>
                          </div>
                          <div className={styles.buttons}>
                            <button className={styles.btn}>
                              Zobacz aplikację
                            </button>
                          </div>
                        </>
                      ) : null}
                      {m.status === "suspended" ? (
                        <>
                          <div className={styles.cardStatus}>
                            <Status
                              text="Mentoring zawieszony"
                              variant="warning"
                            />
                            <p>Zawiesiłeś współpracę z mentorem.</p>
                          </div>
                          <div className={styles.buttons}>
                            <button
                              className={styles.btn}
                              onClick={() =>
                                setRestoring({
                                  id: m.id,
                                  fullName: m.fullName,
                                  plan: m.plan,
                                  paidUntil: m.paidUntil,
                                })
                              }
                            >
                              Odwieś
                            </button>
                          </div>
                        </>
                      ) : null}
                      {m.status === "rejected" ? (
                        <>
                          <div className={styles.cardStatus}>
                            <Status
                              text="Aplikacja odrzucona"
                              variant="danger"
                            />
                            <p>Mentor odrzucił Twoją aplikację.</p>
                          </div>
                          <div className={styles.buttons}>
                            <button className={styles.btn}>
                              Zobacz powód odrzucenia
                            </button>
                          </div>
                        </>
                      ) : null}
                      {m.status === "accepted" && !m.scheduled ? (
                        <>
                          <div className={styles.cardStatus}>
                            <Status
                              text="Aplikacja zaakceptowana"
                              variant="success"
                            />
                            <p>
                              Jeżeli zostanie zaakceptowana, poprosimy Cię o
                              wybranie terminów.
                            </p>
                          </div>
                          <div className={styles.buttons}>
                            <button className={styles.btn}>
                              Wybierz terminy spotkań
                            </button>
                          </div>
                        </>
                      ) : null}
                      {m.status === "accepted" && m.scheduled ? (
                        <div className={styles.buttons}>
                          <button
                            onClick={() =>
                              setSuspending({
                                id: m.id,
                                fullName: m.fullName,
                                plan: m.plan,
                                paidUntil: m.paidUntil,
                              })
                            }
                            className={styles.btn}
                          >
                            Zawieś subskrypcję
                          </button>
                          <button
                            onClick={() =>
                              setCancelling({
                                id: m.id,
                                fullName: m.fullName,
                                plan: m.plan,
                                paidUntil: m.paidUntil,
                              })
                            }
                            className={clx(styles.btn, styles.btnRed)}
                          >
                            Zakończ subskrypcję
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </Slider>
            ) : null}
          </div>
        </div>
      </Container>
    </>
  );
};
