import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./CreateMentoringOffer.module.scss";
import { useCreateOfferReducer } from "src/reducers/createOffer";
import { Initial, Build, Determine, Summary, AddScheduleMsg } from "./steps";
import Container from "src/components/Container/Container";
import { Tag } from "@customTypes/tags";
import { Loader } from "src/components/_grouped/loader";
import { fetchAllSchedules } from "@services/scheduleService";
import Button from "src/components/Button/Button";
import { useSelector } from "react-redux";
import { fetchMentoringOffer } from "@services/offer/fetchMentoringOffer";
import { useSchedulesReducer } from "src/reducers/schedules";
import { ScheduleOption } from "src/reducers/createOffer/types";

type MentorData = {
  email: string;
  id: number;
  role: "M" | "S";
  username: string;
};

export const CreateMentoringOffer = () => {
  const [initialPending, setInitialPending] = useState<boolean>(true);
  const [schedulesData, setSchedulesData] = useState([]); // State to hold the schedule data
  const {
    createOfferState: state,
    reset,
    loadOffers,
    setPending,
    updateStatus,
    submitDetermine,
  } = useCreateOfferReducer();
  const sr = useSchedulesReducer();
  const isScheduled = sr.schedulesState.schedules.length > 0;
  const mentor: MentorData = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const hasAnyPlan = !!(state.basic || state.advanced || state.pro)
    const isPreparatorySteps = (state.step === 'initial' || state.step === 'determine')
    // if(!hasAnyPlan && !isPreparatorySteps){
    //   reset()
    //   setInitialPending(true)
    // }
    if(isScheduled && hasAnyPlan && isPreparatorySteps){
      const numberOfPlans = [state.basic, state.advanced, state.pro].filter(s => s !== null).length
      const parsedNumberOfPlans = Math.min(1, Math.max(3, numberOfPlans)) as (1|2|3)
      submitDetermine(parsedNumberOfPlans, true)
    }
  }, [setInitialPending, isScheduled, reset, state, submitDetermine])

  useEffect(() => {
    const fetchInitialData = async () => {
      setPending(true);
      try {
        const [resOffers] = await Promise.all([
          fetchMentoringOffer(mentor.id),
        ]);
        if (resOffers.success) {
          loadOffers(resOffers.data);
        }
      } catch (e) {
        updateStatus({
          errorMessage: "Wystąpił błąd podczas komunikacji z serwerem.",
          success: false,
        });
      }
      setPending(false);
      setInitialPending(false);
    };
    if (initialPending) {
      fetchInitialData();
    } 
  }, [setPending, setInitialPending, updateStatus, loadOffers, mentor.id, initialPending]);

  return (
    <main className={styles.main}>
      <Container as={Tag.Section} classes={styles.containerOuter}>
        {state.pending ? <Loader overlay shadow spinner /> : null}
        {state.errorMessage ? (
          <div className={styles.errorMessage}>
            <p>{state.errorMessage}</p>
            <div>
              <Button className={styles.btn} onClick={reset}>
                Spróbuj od początku
              </Button>
            </div>
          </div>
        ) : initialPending ? (
          <Loader spinner />
        ) : isScheduled ? (
          <>
            {state.step === "initial" ? <Initial /> : null}
            {state.step === "determine" ? <Determine /> : null}
            {state.step === "build" ? <Build /> : null}
            {state.step === "summary" ? <Summary /> : null}
          </>
        ) : (
          <AddScheduleMsg />
        )}
      </Container>
    </main>
  );
};
