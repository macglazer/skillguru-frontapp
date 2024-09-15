import {ButtonBase, styled as styledMui, alpha} from "@mui/material";

export const StyledCalendarEvent = styledMui(ButtonBase)<{color: 'primary' | 'secondary'}>(({theme, color}) => ({
    backgroundColor: color === 'primary' ? alpha(theme.palette.primary.main, 0.1) : theme.palette.base['20'],
    color: theme.palette[color].main,
    padding: theme.spacing(.5, 1),
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    position: 'relative',
    overflow: 'hidden',
    margin: theme.spacing(0.25, 1),
    width: `calc(100% - ${theme.spacing(2)})`,

    '& span:first-child': {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        justifySelf: 'flex-start',
        width: '100%'
    },

    '&:before': {
        content: '""',
        position: 'absolute',
        width: '3px',
        height: '100%',
        backgroundColor: theme.palette[color].main,
        top: 0,
        left: 0,
    },
}));