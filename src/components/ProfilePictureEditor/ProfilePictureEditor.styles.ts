import {styled as styledMui} from "@mui/material";

export const StyledWrapper = styledMui('div')(({theme}) => ({
    gridTemplateColumns: '64px 1fr',
    gap: theme.spacing(3),
    display: 'grid',

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
    }
}))

export const StyledAvatarWrapper = styledMui('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),

    [theme.breakpoints.down('md')]: {
        flexDirection: 'row',
    }
}))

export const StyledAvatarPreview = styledMui('div')<{ backgroundSrc: string | null }>(({theme, backgroundSrc}) => ({
    height: '64px',
    width: '64px',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${backgroundSrc})`,
    backgroundColor: theme.palette.grey['300'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.grey['600'],

    '& svg': {
        display: !!backgroundSrc ? 'none' : 'block'
    }
}))