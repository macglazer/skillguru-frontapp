import React, {FC} from "react";
import {DateHeaderProps} from "react-big-calendar";
import Typography from "@mui/material/Typography";
import {format} from "date-fns";

type Props = DateHeaderProps

const offRangeStyles = {
    color: 'base.40'
}

const CalendarDateHeader: FC<Props> = ({date, isOffRange}) => {

    return (
        <Typography variant='body2' sx={{pt: 2, pr: 2, ...(isOffRange ? offRangeStyles : {})}}>
            {format(date, 'd')}
        </Typography>
    )
}

export default CalendarDateHeader