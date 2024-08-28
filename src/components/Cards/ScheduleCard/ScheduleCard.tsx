import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// Components
import Options from './components/Options/Options';
// Icons
import Money from './components/icons/Money';
import Calendar from './components/icons/Calendar';
import Timer from './components/icons/Timer';
import Person from './components/icons/Person';
import Pencil from 'src/pages/app/Schedules/components/icons/Pencil';
import Trash from 'src/pages/app/Schedules/components/icons/Trash';
// Styles
import styles from './ShceduleCard.module.scss';
import Modal from "../../Modal/Modal";
import {useQueryClient} from "@tanstack/react-query";
import {getScheduleQueryOptions} from "../../../pages/app/Schedules/screens/ScheduleForm/ScheduleScreen";
import {getSingleSessionQueryOptions} from "../../../pages/app/Schedules/screens/SessionForm/SessionForm";

export interface ScheduleCardProps {
    id: string;
    dateStart: Date;
    dateEnd: Date;
    scheduleStartDay: string;
    scheduleEndDay: string;
    meetTime: number;
    title: string;
    scheduleName: string;
    sessionTypeName: string;
    removeItem?: (id: string, arrayType: 'schedules' | 'sessions') => void;
    assignedSession: number;
    type: string;
    participant: number;
    sessionType: string;
    description: string;
    sessionPrice: number;
    sessionName: string;

    schedule?: {
        type: 'individual' | 'group';
        created: Date;
        assignedSession: number;
        scheduleName: string;
        participant: number;
    };
    session?: {
        name: string;
        description: string;
        sessionPrice: number;
        sessionName: string;
        meetTime: number;
        sessionTypeName: string;
        scheduleName: string;
    };
}

const prefetchStaleTime = 1000 * 60 * 5;

const ScheduleCard = (props: ScheduleCardProps) => {
    // TODO refactor it to use separate components (eventually share common components) - composition over conditions hell
    if (!!!props.schedule && !!!props.session)
        throw new Error('One of parameters schedule or session is required!');

    const {
        id,
        dateStart,
        dateEnd,
        meetTime,
        scheduleName,
        schedule,
        session,
        sessionTypeName,
        removeItem,
    } = props;

    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(
            !!session
                ? `/schedules/edit-session/${id}`
                : `/schedules/edit-schedule/${id}`
        );
    };


    const queryClient = useQueryClient();
    const prefetchScheduleData = () => {
        queryClient.prefetchQuery({
            ...getScheduleQueryOptions(id),
            staleTime: prefetchStaleTime,
        })
    }
    const prefetchSessionData = () => {
        queryClient.prefetchQuery({
            ...getSingleSessionQueryOptions(id),
            staleTime: prefetchStaleTime,
        })
    }

    const prefetchData = () => {
        if (!!schedule) prefetchScheduleData()
        else prefetchSessionData()
    }

    const handleDeleteClick = () => {
        !!removeItem && removeItem(id, !!session ? 'sessions' : 'schedules');
        window.location.reload();

    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.header}>
                        <h3 className={styles.title}>
                            {schedule ? schedule?.scheduleName : session?.sessionTypeName}
                        </h3>

                        <Options
                            options={[
                                {
                                    icon: <Pencil/>,
                                    text: 'Edytuj',
                                    onClick: handleEditClick,
                                    className: styles.option,
                                    onMouseEnter: prefetchData,
                                },
                                {
                                    icon: <Trash/>,
                                    text: 'Usuń',
                                    className: styles.optionRemove,
                                    onClick: handleDeleteClick,
                                },
                            ]}
                        />
                    </div>
                    {!schedule && <h4 className={styles.subtitle}>{session?.scheduleName}</h4>}
                    {!!schedule && (
                        <>
                            <p>Data stworzenia: {schedule.created.toLocaleDateString()}</p>
                        </>
                    )}
                    {!!schedule && (
                        <p data-is-assigned={schedule.assignedSession !== 0}>
                            {schedule.assignedSession === 0
                                ? 'Brak przypisanej sesji!'
                                : `Używany w ${schedule.assignedSession} ${
                                    schedule.assignedSession === 1 ? 'sesji' : 'sesjach'
                                }`}
                        </p>
                    )}
                    {!!session && (
                        <>
                            <p>{session.description}</p>
                            <button
                                className={styles.more}
                                type='button'
                                onClick={() => {
                                    setOpenModal(true);
                                }}>
                                Podgląd
                            </button>
                        </>
                    )}
                </div>

                <div className={styles.bottom}>
                    {schedule?.type && (
                        <p>
                            <Person/> {schedule.type === 'group' ? 'Grupowe' : '1:1'}
                        </p>
                    )}
                    {session?.sessionPrice && (
                        <p>
                            <Money/> {session.sessionPrice} zł
                        </p>
                    )}
                    {!session && dateStart && dateEnd && (
                        <p>
                            <Calendar/> {dateStart.toLocaleDateString()} -{' '}
                            {dateEnd.toLocaleDateString()}
                        </p>
                    )}
                    {meetTime && (
                        <p>
                            <Timer/>
                            {meetTime} min
                        </p>
                    )}
                </div>
            </div>
            {!!session && openModal && (
                <Modal
                    title={schedule ? schedule?.scheduleName : session?.sessionTypeName ?? ''}
                    classNameContent={styles.modalContent}
                    closeHandler={() => setOpenModal(false)}>
                    <p className={styles.description}>{session?.description}</p>
                </Modal>
            )}
        </>
    );
};

export default ScheduleCard;
