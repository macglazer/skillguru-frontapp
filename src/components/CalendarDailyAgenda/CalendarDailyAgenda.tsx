import React, {FC, useEffect, useState} from "react";
import {MentoringSessionInListT} from "@services/mentoringSessions/mentoringSession.types";
import {Box, Skeleton} from "@mui/material";
import {useParams, useSearchParams} from "react-router-dom";
import {QueryKey} from "@tanstack/react-query";
import MentoringSessionAcordeonCard
    from "../_mentoringMeeting/MentoringSessionAcordeonCard/MentoringSessionAcordeonCard";

type Props = {
    isLoading: boolean;
    events: MentoringSessionInListT[];
    queryKey: QueryKey
}

const skeletonDimensions = {
    width: '100%',
    height: 185
}

const CalendarDailyAgenda: FC<Props> = ({isLoading, events, queryKey}) => {
    const [openEventId, setOpenEventId] = useState<string | null>(null);

    const onToggleFactory = (eventId: string) => () => {
        setOpenEventId(prev => prev === eventId ? null : eventId);
    }

    const [searchParams] = useSearchParams()
    useEffect(() => {
        const eventIdToOpen = searchParams.get('mentoringSessionId');
        if(eventIdToOpen && !isLoading) {
            setOpenEventId(eventIdToOpen);
            const element = document.querySelector(`#mentoringSessionId-${eventIdToOpen}`)
            if(element) element.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    }, [searchParams, isLoading]);


    return (
        <Box sx={{ display: 'grid', gap: 3, pt: 2 }}>
            {isLoading
                ? (
                    <>
                        <Skeleton {...skeletonDimensions}/>
                        <Skeleton {...skeletonDimensions}/>
                        <Skeleton {...skeletonDimensions}/>
                    </>
                )
                : (
                    events.map((event) =>
                        <MentoringSessionAcordeonCard
                            queryKey={queryKey}
                            isOpen={openEventId === event.id}
                            onToggle={onToggleFactory(event.id)}
                            {...event}
                        />
                    )
                )
            }
        </Box>
    )
}

export default CalendarDailyAgenda