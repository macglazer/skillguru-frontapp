import React, {FC, useState, MouseEvent} from "react";
import {EventWrapperProps} from "react-big-calendar";
import {StyledCalendarEvent} from "./CalendarEvent.styles";
import Typography from "@mui/material/Typography";
import {format} from "date-fns";
import {MeetingInCalendar} from "../../../../pages/app/CalendarView/CalendarView";
import {generatePath, Link} from "react-router-dom";
import paths from "../../../../paths";
import CalendarEventDetailsModal from "../CalendarEventDetailsModal/CalendarEventDetailsModal";

const maxDisplay = 2;

const prepareLinkParams = (date: Date) => ({
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString(),
    day: date.getDate().toString(),
})

type Props = Pick<EventWrapperProps, 'event'>

const CalendarEvent: FC<Props> = ({event}) => {
    const [modalAnchorEl, setModalAnchorEl] = useState<null | HTMLElement>(null);
    const isModalOpen = Boolean(modalAnchorEl);
    const openModal = (event: MouseEvent<HTMLButtonElement>) => setModalAnchorEl(event.currentTarget);
    const closeModal = () => setModalAnchorEl(null);

    const {metadata} = (event as MeetingInCalendar);

    if (metadata.eventInDayNumber > maxDisplay) return null;

    if (metadata.eventInDayNumber === maxDisplay) return (
        <Link
            to={generatePath(paths.calendarDaily, prepareLinkParams(event.start!)) + `?mentoringSessionId=${metadata.id}`}
            style={{textDecoration: 'none'}}
        >
            <StyledCalendarEvent color='secondary'>
                <Typography component='span' variant='buttonSm' color='inherit'>
                    +{metadata.eventInDayCount - maxDisplay} innych
                </Typography>
            </StyledCalendarEvent>
        </Link>
    )

    return (
        <>
            <StyledCalendarEvent color='primary' onClick={openModal}>
                <Typography component='span' variant='buttonSm' color='inherit'>
                    {event.title}
                </Typography>
                <Typography component='span' variant='buttonSm' sx={{justifySelf: 'flex-end'}} color='inherit'>
                    {format(event.start!, 'HH:mm')}
                </Typography>
            </StyledCalendarEvent>
            {/*Consider one modal per Calendar component if optimization will be required */}
            <CalendarEventDetailsModal
                mentoringSessionId={metadata.id}
                openModal={openModal}
                closeModal={closeModal}
                isOpen={isModalOpen}
                anchorEl={modalAnchorEl}
            />
        </>
    )
}

export default CalendarEvent