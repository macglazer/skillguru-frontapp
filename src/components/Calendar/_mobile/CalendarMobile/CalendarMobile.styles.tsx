import {styled as styledMui} from "@mui/material";

export const StyledDayInCalendar = styledMui('div')(({theme}) => ({
    display: 'grid',
    padding: theme.spacing(2),
    gap: theme.spacing(4),
    gridTemplateColumns: '1fr auto',
    border: `1px solid ${theme.palette.base['40']}`,
}));