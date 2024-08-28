import React, {FC} from "react";
import type {HeaderProps} from "react-big-calendar";
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";

type Props = HeaderProps;

const CalendarHeader: FC<Props> = ({label}) => {
    return <Box sx={{pb: 2}}>
        <Typography color={'base.80'} variant='caption'>
            {label}
        </Typography>
    </Box>
};

export default CalendarHeader