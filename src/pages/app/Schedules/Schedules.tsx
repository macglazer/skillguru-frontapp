import React, {useCallback, useEffect, useMemo, useState} from 'react';
// Sections
import Empty from './components/Empty/Empty';
// Components

// Icons
import Add from '@icons/Add';
import Sessions from '@icons/Sessions';
// Types
import {Tag} from '@customTypes/tags';

// Styles
import styles from './components/Empty/Empty.module.scss';
import scheduleStyles from './Schedules.module.scss';
import {deleteSession, fetchMentorSession} from '../../../services/sessionService';
import {useSelector} from "react-redux";
import ScheduleCard, {ScheduleCardProps} from "../../../components/Cards/ScheduleCard/ScheduleCard";
import Title, {TitleTag, TitleVariant} from "../../../components/typography/Title/Title";
import Modal from "../../../components/Modal/Modal";
import Pagination from "../../../components/Pagination/Pagination";
import Container from "../../../components/Container/Container";
import Button, {ButtonTag, ButtonVariant} from "../../../components/Button/Button";
import {deleteSchedule, fetchAllSchedules} from "@services/scheduleService";


const SchedulesView = () => {
    const [sessions, setSessions] = useState<ScheduleCardProps[]>([]);
    const [schedules, setSchedules] = useState<ScheduleCardProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const userFromRedux = useSelector((state: any) => state.auth.user);


    const removeItem = useCallback(
        (id: string, arrayType: 'schedules' | 'sessions') => {
            if (arrayType === 'schedules') {
                setIsModalOpen(false);
                const assignedSession = schedules.find(schedule => schedule.id === id)?.schedule?.assignedSession || 0;

                if (assignedSession > 0) {
                    setIsModalOpen(true);

                } else {
                    deleteSchedule(id).then(() => {
                        setSchedules(schedules.filter((item) => item.id !== id));
                    });
                }
            } else {
                deleteSession(id).then(() => {
                    setSessions(sessions.filter((item) => item.id !== id));
                })
            }
        },
        [schedules, sessions]
    );

    useEffect(() => {
        fetchAllSchedules().then((res) => {
            const formatSchedules = res?.data.map(
                (elementFromAPI: ScheduleCardProps) => ({
                    id: elementFromAPI.id,
                    dateStart: new Date(elementFromAPI?.scheduleStartDay),
                    dateEnd: new Date(elementFromAPI?.scheduleEndDay),
                    meetTime: elementFromAPI.meetTime,
                    participant: elementFromAPI?.participant,
                    schedule: {
                        type: elementFromAPI?.type,
                        created: elementFromAPI.schedule?.created || new Date(),
                        assignedSession: elementFromAPI.assignedSession ?? 0,
                        scheduleName: elementFromAPI?.scheduleName,
                        participant: elementFromAPI?.participant,
                    },
                })
            );
            setSchedules(formatSchedules);
        });
    }, []);


    useEffect(() => {
        fetchMentorSession(userFromRedux.id).then((res) => {
            const formattedSessions = res?.data.map((elementFromAPI: ScheduleCardProps) => ({
                id: elementFromAPI?.id,
                dateStart: new Date(elementFromAPI?.scheduleStartDay),
                dateEnd: new Date(elementFromAPI?.scheduleEndDay),
                meetTime: elementFromAPI?.meetTime,
                session: {
                    description: elementFromAPI?.description,
                    sessionPrice: elementFromAPI?.sessionPrice,
                    meetTime: elementFromAPI?.meetTime,
                    sessionName: elementFromAPI?.sessionName,
                    sessionTypeName: elementFromAPI?.sessionType,
                    scheduleName: elementFromAPI?.scheduleName || 'brak przypisanego harmonogramu',
                },
            }));
            setSessions(formattedSessions);
        });
    }, []);

    const currentView = useMemo(() => {
        if (!!!schedules?.length)
            return (
                <Empty
                    title='Harmonogram spotkań'
                    text='Aby dodać sesję, najpierw ustal choć 1 harmonogram'
                    button={{text: 'Nowy harmonogram', link: '/schedules/add-schedule'}}
                />
            );

        return (
            <>
                <main className={scheduleStyles.main}>
                    <Container as={Tag.Section} classes={scheduleStyles.container}>
                        <header className={scheduleStyles.header}>
                            <Title tag={TitleTag.h2} variant={TitleVariant.section}>
                                Harmonogramy
                            </Title>
                            <Button
                                as={ButtonTag.InternalLink}
                                variant={ButtonVariant.Outline}
                                href='/schedules/add-schedule'
                                classes={styles.button}>
                                Dodaj <Add/>
                            </Button>
                        </header>
                        <div className={scheduleStyles.list}>
                            {schedules.map((item) => (
                                <ScheduleCard key={item.id} removeItem={removeItem} {...item} />
                            ))}
                        </div>
                        {sessions?.length > 3 && <Pagination name='Schedules' maxPage={0}/>}
                    </Container>
                    <Container as={Tag.Section} classes={scheduleStyles.container}>
                        <header className={scheduleStyles.header}>
                            <Title tag={TitleTag.h2} variant={TitleVariant.section}>
                                Sesje
                            </Title>
                            {!!sessions?.length && (
                                <Button
                                    as={ButtonTag.InternalLink}
                                    variant={ButtonVariant.Outline}
                                    href='/schedules/add-session'
                                    classes={styles.button}>
                                    Dodaj <Add/>
                                </Button>
                            )}
                        </header>
                        {!!!sessions?.length ? (
                            <Empty
                                text='Dodałeś właśnie swój pierwszy harmonogram!
					Utwórz teraz nową sesję'
                                button={{text: 'Nowa sesja', link: '/schedules/add-session'}}
                                icon={<Sessions/>}
                            />
                        ) : (
                            <div className={scheduleStyles.list}>
                                {sessions.map((item) => (
                                    <ScheduleCard key={item.id} removeItem={removeItem} {...item} />
                                ))}
                            </div>
                        )}
                        {sessions?.length > 6 && <Pagination name='Sessions' maxPage={3}/>}
                    </Container>
                </main>
            </>
        );
    }, [schedules, sessions]);

    return (
        <>
            {currentView}
            {isModalOpen && (
                <Modal title='' closeHandler={() => setIsModalOpen(false)}>
                    <Title tag={TitleTag.h2} variant={TitleVariant.section}>
                        Nie możesz usunąć harmonogramu
                    </Title>
                    <p className={scheduleStyles.modalText}>Nie można usunąć harmonogramu, ponieważ jest on przypisany
                        do <span>tej sesji.</span></p>
                </Modal>
            )}
        </>
    );
};
export default SchedulesView;