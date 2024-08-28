import React from 'react';
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";
import MentoringSessionReschedule
    from "../../../components/_mentoringMeeting/MentoringSessionReschedule/MentoringSessionReschedule";


const RescheduleMeetingView = () => {
    const { meetingId, sessionId, mentorId } = useParams() as { meetingId: string, sessionId: string, mentorId: string };
    return (
        <Container>
            {/* TODO set spacing*/}
            <Typography sx={{pt: 5}} variant='h2'>
                Ustal nowy termin spotkania
            </Typography>
            <Typography sx={{ pt: 2, pb: 2 }} variant='body2'>
                Wybierz nowy termin spotkania. Spotkanie zostanie automatycznie przełożone.
            </Typography>
            <MentoringSessionReschedule meetingId={meetingId} sessionId={sessionId} mentorId={mentorId}/>
        </Container>
    )
}

export default RescheduleMeetingView;