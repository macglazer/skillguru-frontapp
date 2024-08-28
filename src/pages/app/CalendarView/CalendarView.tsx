import React, {useEffect, useMemo, useState} from 'react';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getMonth, lastDayOfMonth, setDate, setMonth} from "date-fns";

import
    getMentoringSessionsInDatesService
    , {
    getMentoringSessionsInDatesServiceKeyGenerator
} from "@services/mentoringSessions/getMentoringSessionsInDates.service";
import Typography from "@mui/material/Typography";
import {Container, Theme, useMediaQuery} from "@mui/material";
import {Event, NavigateAction} from "react-big-calendar";
import Calendar from "../../../components/Calendar/Calendar";
import CalendarMobile from "../../../components/Calendar/_mobile/CalendarMobile/CalendarMobile";
import {useLocation} from "react-router-dom";

export type MeetingInCalendar = Event & {
    metadata: {
        eventInDayNumber: number,
        eventInDayCount: number,
        id: string,
    }
}

const generateDayKey = (date: Date) => `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;

const CalendarView = () => {
    const [selectedRange, setSelectedRange] = useState(
        {
            from: setDate(new Date(), 1),
            to: lastDayOfMonth(new Date())
        });

    const moveSelectedRange = (navigateAction: NavigateAction) => {
        setSelectedRange((prevState) => {
            const newMonth = getMonth(prevState.from) + (navigateAction === 'PREV' ? -1 : 1);
            return {
                from: setMonth(prevState.from, newMonth),
                to: setMonth(prevState.to, newMonth),
            }
        });
    }

    const updateSelectedRange = (newDate: Date) => {
        const from = setDate(newDate, 1);
        const to = lastDayOfMonth(newDate);

        setSelectedRange({from, to});
    }



    const queryParams = useMemo(() => ({
        from: selectedRange.from,
        to: selectedRange.to,
    }), [selectedRange]);

    const {data} = useQuery({
        queryKey: getMentoringSessionsInDatesServiceKeyGenerator(queryParams),
        queryFn: () => getMentoringSessionsInDatesService(queryParams),


    });

    const events: MeetingInCalendar[] = useMemo(() => {
        if (!data) return [];

        const eventsCount: Record<string, number> = {};
        const events = data.map(({id, title, start, end}) => {
            const eventDateKey = generateDayKey(start);

            if (!eventsCount.hasOwnProperty(eventDateKey)) eventsCount[eventDateKey] = 0;
            else eventsCount[eventDateKey]++;

            return {
                title,
                start,
                end,
                allDay: true,
                metadata: {
                    eventInDayNumber: eventsCount[eventDateKey],
                    id,
                }
            };
        })

        return events.map((event) => ({
            ...event,
            metadata: {...event.metadata, eventInDayCount: eventsCount[generateDayKey(event.start)] + 1},
        }));

    }, [data]);

    const isMD = useMediaQuery((theme) => (theme as Theme).breakpoints.up('md'));

    return (
        <Container>
            <Typography sx={{pt: 5, pb: {sm: 2, md: 3}}} variant='h2'>Kalendarz</Typography>
            {isMD ? (
                <Calendar
                    calendarProps={{
                        events,
                        onNavigate: updateSelectedRange
                    }}
                />) : (
                <CalendarMobile
                    events={events}
                    moveSelectedRange={moveSelectedRange}
                    selectedRange={selectedRange}
                />
            )}
        </Container>
    );
};

export default CalendarView;
