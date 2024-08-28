import {styled as styledMui} from "@mui/material";

export const StyledInputWrapper = styledMui('div')(({theme}) => ({
    display: 'flex',
    // gridGap: theme.spacing(1),
    color: 'green',
    flexDirection: 'column'
}))

export const StyledFeedbackWrapper = styledMui('div')(({theme}) => ({
    display: 'grid',
    gridGap: theme.spacing(1),
    marginBottom: theme.spacing(2)
}))