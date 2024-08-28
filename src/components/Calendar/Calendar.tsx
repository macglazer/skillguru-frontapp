import React, {FC} from "react";
import {Calendar as BigCalendar, dateFnsLocalizer, type CalendarProps} from 'react-big-calendar';
import {format, parse, startOfWeek, getDay} from 'date-fns';
import {pl} from 'date-fns/locale';
import {StyledCalendarWrapper} from "./Calendar.styles";
import CalendarToolbar from "./_components/CalendarToolbar/CalendarToolbar";
import CalendarHeader from "./_components/CalendarHeader/CalendarHeader";
import CalendarDateHeader from "./_components/CalendarDateHeader/CalendarDateHeader";
import CalendarEvent from "./_components/CalendarEvent/CalendarEvent";

const locales = {
    'pl-PL': pl,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), {weekStartsOn: 1}),
    getDay,
    locales
});

type Props = {
    calendarProps: Pick<CalendarProps, 'events' | 'onNavigate'>
}

const CELL_SIZE = 150

const Calendar: FC<Props> = ({calendarProps}) => {

    return (
        <StyledCalendarWrapper cellSize={CELL_SIZE}>
            <BigCalendar
                localizer={localizer}
                defaultView='month'
                views={['month']}
                components={{
                    toolbar: CalendarToolbar,
                    header: CalendarHeader,
                    month: {dateHeader: CalendarDateHeader},
                    eventWrapper: CalendarEvent,
                }}
                 // In RBC show more logic is messy, so I need to achieve it in other way
                messages={{showMore: () => ''}}
                {...calendarProps}
            />
        </StyledCalendarWrapper>
    )
}

export default Calendar;