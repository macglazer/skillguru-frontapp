import {Card, styled as styledMui} from "@mui/material";

export const StyledCard = styledMui(Card)(({theme}) => ({
    borderRadius: '8px',
    borderColor: theme.palette.base["20"],
    padding: theme.spacing(5, 3),
    maxWidth: '700px',
    margin: 'auto',
    display: 'grid',
    gap: theme.spacing(4),
    justifyContent: 'stretch',
}));

export const StyledStepper = styledMui('div')(({theme}) => ({
    display: 'flex',
    maxWidth: 580,
    width: '100%',
    margin: '0 auto',
    gap: theme.spacing(2),
    height: 8,
    alignSelf: 'center',

    '& span': {
        flexShrink: 1,
        flexGrow: 1,
        width: '100%',
        height: 8,
        borderRadius: 8,
        backgroundColor: theme.palette.primary.main,

        '&:not(.active)': {
            opacity: 0.2
        }
    },
}));