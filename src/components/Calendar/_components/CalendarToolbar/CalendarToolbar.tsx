import React, {type FC, useCallback} from "react";
import type {ToolbarProps} from 'react-big-calendar';
import {Box, Typography} from "@mui/material";
import {format} from "date-fns";
import {ReactComponent as ArrowLeft} from '@icons/svg/arrow-left.svg';
import {ReactComponent as ArrowRight} from '@icons/svg/arrow-right.svg';
import FullSizeIconButton from "../../../FullSizeIconButton/FullSizeIconButton";

type Props = Pick<ToolbarProps<Event>, 'onNavigate' | 'date'>;

const CalendarToolbar: FC<Props> = ({date, onNavigate}) => {

    const onPrev = useCallback(() => onNavigate('PREV'), [onNavigate]);
    const onNext = useCallback(() => onNavigate('NEXT'), [onNavigate]);

    return (
        <Box sx={{pb: 1, mb: 2, display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant='body1' fontWeight={600}>{format(date, 'MMMM yyyy')}</Typography>
            <Box sx={{display: 'flex', gap: 1.5}}>
                <FullSizeIconButton onClick={onPrev}>
                    <ArrowLeft />
                </FullSizeIconButton>
                <FullSizeIconButton onClick={onNext}>
                    <ArrowRight />
                </FullSizeIconButton>
            </Box>
        </Box>
    )
};

export default CalendarToolbar;