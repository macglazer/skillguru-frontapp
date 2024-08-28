import {alpha, styled as styledMui} from "@mui/material";

export const StyledCalendarWrapper = styledMui('div')<{ cellSize: number }>(({theme, cellSize}) => ({
    height: `calc(${cellSize}px * 5 + ${theme.spacing(20)})`,
    position: 'relative',
    borderRadius: 12,
    border: `1px solid ${theme.palette.base["40"]}`,
    padding: theme.spacing(2.5),

    // css classes override
    '.rbc-month-view': {
        border: 'none',
    },
    '.rbc-header': {
        border: 'none',
    },
    '.rbc-day-bg': {
        borderLeftColor: theme.palette.base['40'],
    },
    '.rbc-month-row': {

        borderTopColor: theme.palette.base['40'],
        borderLeft: `1px solid ${theme.palette.base['40']}`,
        borderRight: `1px solid ${theme.palette.base['40']}`,

        '&:nth-child(2)': {
            borderTop: `1px solid ${theme.palette.base['40']}`,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
        },

        '&:last-child': {
            borderBottom: `1px solid ${theme.palette.base['40']}`,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
        }
    },
    '.rbc-off-range-bg': {
        background: 'none',
    },
    '.rbc-today': {
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
    },
}))
