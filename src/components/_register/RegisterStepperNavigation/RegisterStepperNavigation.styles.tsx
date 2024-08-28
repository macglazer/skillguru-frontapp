import {styled as muiStyled} from '@mui/material/styles';

const iconSize = 48

const elementsSpacing = 8;

export const StyledContainer = muiStyled('div')(({theme}) => ({
    display: 'grid',
    gridGap: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(0),
        '& svg': {

        }
    }
}));

export const StyledIconWrapper = muiStyled('div')(({theme}) => ({
    [theme.breakpoints.down('md')]: {
                padding: theme.spacing(0, 2),
                margin: 'auto'
    }
}))

export const StyledList = muiStyled('ul')(({theme}) => ({
    display: 'grid',
    gridGap: theme.spacing(elementsSpacing),
    zIndex: 1,

    [theme.breakpoints.down('md')]: {
        display: 'flex',
        overflowX: 'hidden',
        padding: theme.spacing(0, 4),
    },
}));

export const StyledNode = muiStyled('li')<{ active: boolean, clickable: boolean }>(({theme, active, clickable}) => ({
    display: 'grid',
    gridTemplateColumns: '48px auto',
    gap: theme.spacing(0, 3),
    alignItems: 'start',
    position: 'relative',
    wordBreak: 'keep-all',
    cursor: clickable ? 'pointer' : 'auto',

    '& div, & span': {
        opacity: active ? 1 : 0.6,
    transition: theme.transitions.create('opacity'),
    },

    [theme.breakpoints.down('md')]: {
        maxWidth: '150px',
        alignItems: 'center',
        gap: theme.spacing(0, 1),
    },

    '&:not(:last-child)::after': {
        content: '""',
        display: 'block',
        height: theme.spacing(elementsSpacing),
        width: '3px',
        top: '100%',
        position: 'absolute',
        zIndex: -1,
        left: (iconSize / 2) - 1.5,
        background: `repeating-linear-gradient(
            0deg,
            ${theme.palette.secondary.main} 0%,
            ${theme.palette.secondary.main} 15%,
            ${theme.palette.secondary.light} 15%,
            ${theme.palette.secondary.light} 30%
        )`,

        [theme.breakpoints.down('md')]: {
            width: theme.spacing(elementsSpacing),
            height: '3px',
            left: '100%',
            top: '50%',
            background: `repeating-linear-gradient(
                90deg,
                ${theme.palette.secondary.main} 0%,
                ${theme.palette.secondary.main} 15%,
                ${theme.palette.secondary.light} 15%,
                ${theme.palette.secondary.light} 30%
            )`,
        }
    },
}));

export const StyledIcon = muiStyled('div')(({theme}) => ({
    gridRow: '1/3',
    background: theme.palette.secondary.light,
    borderRadius: '100%',
    boxShadow: '0 0 0 1px rgba(255,255,255, 0.25) inset',
    height: iconSize,
    width: iconSize,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down('md')]: {
        gridRow: '1/2',
    }
}));

