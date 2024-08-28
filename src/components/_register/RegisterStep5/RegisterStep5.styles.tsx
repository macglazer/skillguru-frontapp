import {styled as styledMui} from "@mui/material";

export const StyledInputsWrapper = styledMui('div')(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 72px)',
    gridGap: theme.spacing(4),
    justifyContent: 'center',
    alignItems: 'stretch',

    [theme.breakpoints.down('md')]: {
        display: 'flex',
        height: '54px',
        justifyContent: 'space-between',
        maxWidth: '480px',
        margin: '0 auto',
    gridGap: theme.spacing(1),

        '& > *': {
            flex: '54px 0 0',
        }
    },

    '& input': {
        fontSize: '28px',
        fontWeight: 600,
        padding: theme.spacing(2),
        textAlign: 'center',

        [theme.breakpoints.down('md')]: {
            fontSize: '22px',
            padding: theme.spacing(1.4),
        }
    }
}))

export const StyledFallbackWrapper = styledMui('div')(({theme}) => ({
    gridColumn: '1/4'
}))
