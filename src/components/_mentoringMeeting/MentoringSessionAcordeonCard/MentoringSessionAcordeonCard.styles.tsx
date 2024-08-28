import {ButtonBase, styled as styledMui} from "@mui/material";

const area = {
    timeRange: 'timeRange',
    main: 'main',
    expandButton: 'expandButton',
}

const buttonArea = {
    changeMeetingButton: 'changeMeetingButton',
cancelMeetingButton: 'cancelMeetingButton',
joinMeetingButton: 'joinMeetingButton',
}

export const StyledCard = styledMui('div')(({theme}) => ({
    padding: theme.spacing(3),
    display: 'grid',
    gap: theme.spacing(3),
    borderRadius: 12,
    justifyContent: 'flex-start',
    border: `1px solid ${theme.palette.base['40']}`,
    gridTemplateColumns: '180px 1fr 80px',
    gridTemplateAreas: `"${area.timeRange} ${area.main} ${area.expandButton}"`,

    '@media (max-width: 1340px)': {
        gridTemplateColumns: '1fr 80px',
        gridTemplateAreas: `"${area.timeRange} ${area.expandButton}" "${area.main} ${area.main}"`,
    }
}))

export const StyledButtonsWrapper = styledMui('div')(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'auto auto 1fr',
    alignItems: 'flex-start',
    justifyItems: 'flex-end',
    gap: theme.spacing(2),
    gridTemplateAreas: `"${buttonArea.changeMeetingButton} ${buttonArea.cancelMeetingButton} ${buttonArea.joinMeetingButton}"`,

    '@media (max-width: 1025px)': {
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto auto auto',
        gap: theme.spacing(3),
        gridTemplateAreas: `"${buttonArea.joinMeetingButton}" "${buttonArea.changeMeetingButton}" "${buttonArea.cancelMeetingButton}"`,
        justifyItems: 'stretch',
    }
}));

export const StyledRoundButton = styledMui(ButtonBase)<{ isOpen: boolean }>(({theme, isOpen}) => ({
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.base['40']}`,
    borderRadius: '50%',
    transform: `rotate(${isOpen ? 0 : 180}deg)`,
    transition: theme.transitions.create('transform'),
}));