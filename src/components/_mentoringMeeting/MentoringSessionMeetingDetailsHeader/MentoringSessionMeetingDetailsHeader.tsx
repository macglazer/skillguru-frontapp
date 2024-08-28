import React, {FC} from "react";
import {Avatar, Box, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";

type Props = {
    avatarUrl?: string;
    mentorName?: string;
    title?: string;
    isLoading: boolean;
}

const MentoringSessionMeetingDetailsHeader: FC<Props> = ({mentorName, avatarUrl, isLoading, title}) => {
    return (
        <Box sx={{ display: 'grid', gap: 1.5}}>
            <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                <Avatar sx={{height: 32, width: 32}} src={avatarUrl}/>
                <Typography variant='buttonSm'>{isLoading ? <Skeleton width={120}/> : mentorName}</Typography>
            </Box>
            <Typography variant='buttonLg'>{isLoading ? <Skeleton/> : title}</Typography>
        </Box>
    )
}

export default MentoringSessionMeetingDetailsHeader