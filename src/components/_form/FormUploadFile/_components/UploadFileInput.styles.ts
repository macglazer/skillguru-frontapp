import {styled as styledMui} from "@mui/material";

export const StyledUploadArea = styledMui('div')<{ disabled: boolean}>(({theme, disabled}) => ({
    padding: theme.spacing(3),
    border: `2px dashed ${theme.palette.base['40']}`,
    borderRadius: '10px',
    display: 'grid',
    gap: theme.spacing(1),
    cursor: disabled ? 'not-allowed' : 'pointer',
    justifyContent: 'center',
    opacity: disabled ? 0.4 : 1,
}));

export const StyledIcon = styledMui('div')(({theme}) => ({
    background: `radial-gradient(circle, ${theme.palette.grey['300']} 0%, ${theme.palette.grey['300']} 50%, ${theme.palette.grey['100']} 50%, ${theme.palette.grey['100']} 100%)`,
    padding: theme.spacing(1.75),
    height: '48px',
    width: '48px',
    borderRadius: '50%',
    position: 'relative',
    justifySelf: 'center'
}));