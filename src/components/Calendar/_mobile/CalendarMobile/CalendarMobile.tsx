import React, {FC, useMemo} from 'react';
import {MeetingInCalendar} from "../../../../pages/app/CalendarView/CalendarView";
import {NavigateAction} from "react-big-calendar";
import {format, getDaysInMonth, isSameDay} from "date-fns";
import {Box, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import CalendarToolbar from "../../_components/CalendarToolbar/CalendarToolbar";
import {StyledDayInCalendar} from "./CalendarMobile.styles";
import CalendarEvent from "../../_components/CalendarEvent/CalendarEvent";

type Props = {
    events: MeetingInCalendar[],
    moveSelectedRange: (direction: NavigateAction) => void,
    selectedRange: { from: Date, to: Date },
}

type DayInCalendar = {
    date: Date,
    events: MeetingInCalendar[],
}

const CalendarMobile: FC<Props> = ({selectedRange, moveSelectedRange, events}) => {
    const theme = useTheme();

    const daysToDisplay = useMemo(() => {
        const days: DayInCalendar[] = [];
        const daysCount = getDaysInMonth(selectedRange.from);

        for (let i = 1; i <= daysCount; i++) {
            const newDate = new Date(selectedRange.from.getFullYear(), selectedRange.from.getMonth(), i);
            days.push({
                date: newDate,
                events: events.filter(({start}) => isSameDay(start!, newDate)),
            });
        }

        return days;

    }, [selectedRange, events]);

    return <div>
        <Box sx={{ position: 'sticky', top: 64, background: theme.palette.background.default, zIndex: 1, pt: 1}}>
            <CalendarToolbar
                onNavigate={moveSelectedRange}
                date={selectedRange.from}
            />
        </Box>
        <Box sx={{display: 'grid', gap: 1}}>
            {daysToDisplay.map(({date, events}) => (
                <StyledDayInCalendar key={date.toString()}>
                    <Box>
                        {events.map((event) => <CalendarEvent event={event}/>)}
                    </Box>
                    <Typography variant='body2'>
                        {format(date, 'd - EEEEEE')}
                    </Typography>
                </StyledDayInCalendar>
            ))}
        </Box>
    </div>
};

export default CalendarMobile