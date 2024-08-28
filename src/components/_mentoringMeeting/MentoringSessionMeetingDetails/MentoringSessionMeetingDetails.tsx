import React, {FC} from "react";
import Typography from "@mui/material/Typography";
import {Box, Skeleton} from "@mui/material";
import {MentoringSessionT} from "@services/mentoringSessions/mentoringSession.types";
import {ReactComponent as EnvelopeIcon} from '@icons/svg/envelope_dark.svg';
import {ReactComponent as MobileIcon} from '@icons/svg/mobile_dark.svg';


export type Props = {
    meetingDetails: Pick<MentoringSessionT, 'participant'>;
    isLoading: false;
} | {
    meetingDetails: undefined;
    isLoading: true;
}

const iconSx = {
    backgroundColor: 'base.20',
    borderRadius: '50%',
    padding: .5,
    height: '36px',
    width: '36px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const MentoringSessionMeetingDetails: FC<Props> = ({isLoading, meetingDetails}) => {

    return (
        <Box sx={{ display: 'grid', gap: 1.5}}>
            <Typography variant='buttonMd'>{isLoading ? <Skeleton/> : meetingDetails?.participant.name}</Typography>
            <Box sx={{display: 'flex', gap: 3, pb: 3}}>
                <Box sx={{display: 'flex', gap: 1.5, alignItems: 'center'}}>
                    <Box sx={iconSx}>
                        <MobileIcon/>
                    </Box>
                    <Typography variant='buttonSm'>
                        {
                            isLoading
                                ? <Skeleton width={65}/>
                                : meetingDetails?.participant.mobile
                        }
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', gap: 1.5, alignItems: 'center'}}>
                    <Box sx={iconSx}>
                        <EnvelopeIcon/>
                    </Box>
                    <Typography variant='buttonSm'>
                        {
                            isLoading
                                ? <Skeleton width={80}/>
                                : meetingDetails?.participant.email
                        }
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
};

export default MentoringSessionMeetingDetails;