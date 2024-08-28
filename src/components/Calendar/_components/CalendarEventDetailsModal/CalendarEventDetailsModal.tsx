import React, {FC, MouseEvent, useMemo} from "react";
import {Box, Button, IconButton, Menu, Skeleton} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import getMentoringSessionById, {
    getMentoringSessionByIdKeyGenerator
} from "@services/mentoringSessions/getMentoringSessionById.service";
import Typography from "@mui/material/Typography";
import {useSnackbar} from "notistack";
import {format} from "date-fns";
import MentoringSessionMeetingDetails, {Props as MentoringSessionMeetingDetailsProps} from "../../../_mentoringMeeting/MentoringSessionMeetingDetails/MentoringSessionMeetingDetails";

import {generatePath, Link} from "react-router-dom";
import paths from "../../../../paths";

import CloseIcon from "@mui/icons-material/Close";
import MentoringSessionMeetingDetailsHeader
    from "../../../_mentoringMeeting/MentoringSessionMeetingDetailsHeader/MentoringSessionMeetingDetailsHeader";
import MentoringSessionJoinButton
    from "../../../_mentoringMeeting/MentoringSessionJoinButton/MentoringSessionJoinButton";

type Props = {
    openModal: (event: MouseEvent<HTMLButtonElement>) => void;
    closeModal: () => void;
    isOpen: boolean;
    anchorEl: HTMLElement | null;
    mentoringSessionId: string;
}

const prepareLinkParams = (date: Date) => ({
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString(),
    day: date.getDate().toString(),
})

const CalendarEventDetailsModal: FC<Props> = ({anchorEl, openModal, isOpen, closeModal, mentoringSessionId}) => {
    const {enqueueSnackbar} = useSnackbar()

    const {data, isLoading} = useQuery(
        {
            queryKey: getMentoringSessionByIdKeyGenerator(mentoringSessionId),
            queryFn: () => getMentoringSessionById(mentoringSessionId),
            enabled: isOpen
        }
    )

    const meetingDetailsProps: MentoringSessionMeetingDetailsProps = useMemo(() => {
        if (isLoading || !data) return {isLoading: true, meetingDetails: undefined};

        return {
            isLoading: false,
            meetingDetails: { participant : data.participant }
        }
    }, [data, isLoading]);

    if (!isOpen) return null;

    if (!data && !isLoading) {
        enqueueSnackbar('Nie udało się pobrać szczegółów spotkania', {variant: 'error'})
        return null;
    }

    // Not null assertion on "data" is safe here, because it's checked in conditional rendering
    return (
        <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={closeModal}
            PaperProps={{elevation: 4, sx: {borderRadius: '12px'}}}
        >
            <Box sx={{padding: 3, display: 'grid', gap: 1.5, position: 'relative'}}>
                <IconButton sx={{display: {sm: 'none'}, position: 'absolute', top: 8, right: 16}} onClick={closeModal}>
                    <CloseIcon/>
                </IconButton>
                <Typography fontWeight={600} variant='body2' color='primary'>
                    {
                        isLoading
                            ? <Skeleton/>
                            : `${format(data!.start, 'EEEE, do MMMM ⋅ H:mm')} - ${format(data!.end, 'H:mm')}`
                    }
                </Typography>
                <MentoringSessionMeetingDetailsHeader
                    isLoading={isLoading}
                    title={data?.title}
                    mentorName={data?.participant.name}
                    avatarUrl={data?.participant.avatarUrl}
                />
                <Box sx={{pt: 4}}>
                    <MentoringSessionMeetingDetails {...meetingDetailsProps}/>
                </Box>
                <MentoringSessionJoinButton meetingUrl={data?.meetingLink}/>
                <Button
                    sx={{mt: 2}}
                    disabled={!data}
                    component={Link}
                    to={generatePath(paths.calendarDaily, prepareLinkParams(data?.start || new Date())) + `?mentoringSessionId=${mentoringSessionId}`}
                    variant='outlined'
                >
                    Zobacz szczegóły
                </Button>
            </Box>
        </Menu>
    )
};

export default CalendarEventDetailsModal