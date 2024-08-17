import React, {useEffect, useRef, useState} from "react";
import styles from "./CreateMentoringOffer.module.scss";
import {useCreateOfferReducer} from "src/reducers/createOffer";
import {Initial, Build, Determine, Summary, AddScheduleMsg} from "./steps";
import Container from "src/components/Container/Container";
import {Tag} from "@customTypes/tags";
import {Loader} from "src/components/_grouped/loader";
import {fetchAllSchedules} from "@services/scheduleService";
import Button from "src/components/Button/Button";
import {useSelector} from "react-redux";
import {fetchMentoringOffer} from "@services/offer/fetchMentoringOffer";

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
        loadSchedules,
        setPending,
        updateStatus,
    } = useCreateOfferReducer();
    const isScheduled = state.availableSchedules.length > 0;
    const mentor:MentorData = useSelector((state: any) => state.auth.user);

    useEffect(() => {
        const fetchInitialData = async () => {
            setPending(true);
            try {
                const [resSchedules, resOffers] = await Promise.all([
                    fetchAllSchedules(),
                    fetchMentoringOffer(mentor.id),
                ]);
                const {status, data} = resSchedules;
                if (String(status).startsWith("20")) {
                    const parsed = data.map((d) => {
                        return {
                            value: d.id,
                            label: d.scheduleName,
                            meetTime: d.meetTime,
                            participant: d.participant
                        };
                    });
                    loadSchedules(parsed);
                }
                if (resOffers.success) {
                    loadOffers(resOffers.data);
                }
            } catch (e) {
                updateStatus({
                    errorMessage: "Wystąpił błąd podczas komunikacji z serwerem.",
                    success: false,
                });
                loadSchedules([]);
            }
            setPending(false);
            setInitialPending(false);
        };
        if (!state.fetchedInitial) {
            fetchInitialData();
        } else {
            setInitialPending(false);
        }
    }, [state.fetchedInitial, loadSchedules, setPending, setInitialPending, updateStatus, loadOffers]);


    return (
        <main className={styles.main}>
            <Container as={Tag.Section} classes={styles.containerOuter}>
                {state.pending ? <Loader overlay shadow spinner/> : null}
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
                    <Loader spinner/>
                ) : isScheduled ? (
                    <>
                        {state.step === "initial" ? <Initial step={state.step}/> : null}
                        {state.step === "determine" ? <Determine/> : null}
                        {state.step === "build" ? <Build/> : null}
                        {state.step === "summary" ? <Summary/> : null}
                    </>
                ) : (
                    <AddScheduleMsg/>
                )}
            </Container>
        </main>
    );
};
