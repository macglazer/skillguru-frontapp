import React, {FC, useEffect, useMemo, useState} from "react";
import {Box, Button} from "@mui/material";
import {useMutation, useQuery} from "@tanstack/react-query";
import rescheduleMentoringSessionService from "@services/mentoringSessions/rescheduleMentoringSession.service";
import {useSnackbar} from "notistack";
import getMentorAvailabilityByMentorIdService, {
    getMentorAvailabilityByMeetingIdServiceKeyGenerator
} from "@services/mentoringSessions/getMentorAvailabilityByMentorIdService";
import {endOfWeek, EndOfWeekOptions, startOfWeek, StartOfWeekOptions} from "date-fns";
import {useLocation, useNavigate} from "react-router-dom";
import paths from "../../../paths";
import {fetchCalendarSession} from "@services/calendar/calendarService";
import WeeklyCalendarPicker, {CalendarEvent} from "../../WeeklyCalendarPicker/WeeklyCalendarPicker";

type Props = {
    meetingId: string;
    sessionId: string;
    mentorId: string;
}

const dateFnOptions: StartOfWeekOptions | EndOfWeekOptions = {weekStartsOn: 1};

const MentoringSessionReschedule: FC<Props> = ({meetingId, sessionId, mentorId}) => {
    const {enqueueSnackbar} = useSnackbar()
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();

    const [selectedRange, setSelectedRange] = useState(
        {
            from: startOfWeek(new Date(), dateFnOptions),
            to: endOfWeek(new Date(), dateFnOptions)
        });

    const moveSelectedRange = (newDate: Date) => {
        setSelectedRange({
            from: startOfWeek(newDate, dateFnOptions),
            to: endOfWeek(newDate, dateFnOptions),
        });
    }

    const queryParams = useMemo(() => ({
        from: selectedRange.from,
        to: selectedRange.to,
    }), [selectedRange]);

    const {data} = useQuery({
        queryKey: getMentorAvailabilityByMeetingIdServiceKeyGenerator(meetingId, queryParams),
        queryFn: () => getMentorAvailabilityByMentorIdService(meetingId, queryParams)
    })
    const location = useLocation();
    const [combinedData, setCombinedData] = useState<CalendarEvent[]>([]);
    const [currentEvent, setCurrentEvent] = useState<null | number>(null);
    const [unavailableEvents, setUnavailableEvents] = useState<CalendarEvent[]>([]);


    useEffect(() => {
        meetingId &&
        fetchCalendarSession({mentorID: Number.parseInt(mentorId), sessionID: Number.parseInt(sessionId)})
            .then((res) => {
                const dataFromApi = res.data;
                const events: CalendarEvent[] = [];

                dataFromApi.forEach((item: any, index: number) => {
                    const startDateTime = new Date(item.sessionDate + "T" + item.hour);
                    const endDateTime = new Date(
                        startDateTime.getTime() + 60 * 60 * 1000
                    );
                    const event = {
                        id: item.calendarEventId,
                        title: startDateTime.getHours() + ":" + (startDateTime.getMinutes() < 10 ? "0" : "") + startDateTime.getMinutes(),
                        allDay: true,
                        start: startDateTime,
                        end: endDateTime,
                        available: item.available,
                    };
                    events.push(event);
                    if (!item.available) {
                        unavailableEvents.push(event);
                    }
                });
                setCombinedData(events);
                setUnavailableEvents(unavailableEvents);

            })
            .catch((error) => {
                console.error("Błąd podczas pobierania danych z serwera:", error);
            });
    }, [meetingId]);

    // console.log('teraz to chce przetestowac:', unavailableEvents)

    // const onEventClick = (event: CalendarEvent) => {
    //     setCurrentEvent(event.id);
    //     // selectTermHandler(event.start);
    //     // updateFormHandler("term", event.start);
    //     // setTerm(event.start);
    // }

    useEffect(() => {
        if (currentEvent !== null) {
            // updateFormHandler("term", new Date());
        }
    }, [currentEvent]);

    // reschedule
    const rescheduleMutation = useMutation({
        mutationFn: rescheduleMentoringSessionService,
        onSuccess: () => {
            enqueueSnackbar('Nowy termin potwierdzony', {variant: 'success'})
            // navigate(paths.calendar);
        },
        onError: () => enqueueSnackbar('Wystąpił błąd', {variant: 'error'})
    });

    const onAcceptClick = () => {
        if (selectedEvent) rescheduleMutation.mutate({id: meetingId, body: {timeSlotId: selectedEvent}});
    }

    const onEventClick = (event: any) => {
        setCurrentEvent(event.id);
        setSelectedEvent(event.id);
    }

    return (
        <Box sx={{pt: {sm: 0, md: 4}}}>
            <WeeklyCalendarPicker onNavigate={moveSelectedRange} onEventClick={onEventClick}
                                  selectedEventId={currentEvent} events={combinedData}/>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick={onAcceptClick} disabled={!selectedEvent} sx={{mt: 3, ml: 'auto'}} variant='contained'>
                    Potwierdź nowy termin
                </Button>
            </Box>
        </Box>
    )

};

export default MentoringSessionReschedule;