import React, {FC} from "react";
import {Box, Button} from "@mui/material";
import LinkWithCopyFunctionality from "../../LinkWithCopyFunctionality/LinkWithCopyFunctionality";

type Props = {
    meetingUrl?: string;
}

const MentoringSessionJoinButton: FC<Props> = ({meetingUrl}) => {

    return <Box sx={{display: 'grid'}}>
        <Button
            disabled={!meetingUrl}
            component='a'
            target='_blank'
            href={meetingUrl}
            variant='contained'
        >
            Dołącz do spotkania
        </Button>
        {meetingUrl && <LinkWithCopyFunctionality link={meetingUrl} text={meetingUrl}/>}
    </Box>
}

export default MentoringSessionJoinButton;