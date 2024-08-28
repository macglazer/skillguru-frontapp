import {styled as styledMui} from "@mui/material";


export const StyledFeedback = styledMui('div')(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    alignItems: 'center',
    gridGap: theme.spacing(1),
}))

