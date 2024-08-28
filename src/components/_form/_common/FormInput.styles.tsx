import {styled as styledMui} from "@mui/material/styles";

export const StyledInputWrapper = styledMui('div')(({theme}) => ({
    display: 'grid',
    gridGap: theme.spacing(1),
}))


export const StyledFeedbackWrapper = styledMui('div')(({theme}) => ({
    display: 'grid',
    gridGap: theme.spacing(1),
    marginBottom: theme.spacing(2)
}))