import {styled as muiStyled} from '@mui/material/styles';

export const StyledContainer = muiStyled('div')(({theme}) => ({
    display: 'grid',
    gap: theme.spacing(3),
    gridTemplateColumns: 'minmax(320px, 526px) 1fr',
    padding: theme.spacing(3, 0),
    height: '100vh',

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        padding: 0,
        height: 'unset'
    }
}));

export const StyledAside = muiStyled('aside')(({theme}) => ({
    background: theme.palette.secondary.main,
    borderRadius: 20,
    padding: theme.spacing(7, 5, 7, 7),

    [theme.breakpoints.down('md')]: {
        borderRadius: 0,
        padding: theme.spacing(5, 0, 3, 0),
    }
}));

export const StyledMain = muiStyled('main')(({theme}) => ({
    overflowX: 'auto',
    alignSelf: 'center',

    [theme.breakpoints.down('md')]: {
        padding: 0,
    }
}));