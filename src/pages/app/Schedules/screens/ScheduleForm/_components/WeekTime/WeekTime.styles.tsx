import {styled as styledMui} from "@mui/material";


const dayGridArea = {
    switch: 'switch',
    row: 'row',
}

const rowGridArea = {
    add: 'add',
    inputs: 'inputs',
    remove: 'remove',
    error: 'error',
}

export const StyledScheduleDay = styledMui('div')(({theme}) => ({
    display: 'grid',
    gap: theme.spacing(2),
    gridTemplateColumns: '75px auto',
    gridTemplateAreas: `
        "${dayGridArea.switch} ${dayGridArea.row}"
    `,

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'auto',
        gridTemplateAreas: `
            "${dayGridArea.switch}"
            "${dayGridArea.row}"
        `,
    }
}))


export const StyledScheduleDayRow = styledMui('div')(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: '40px auto 40px',
    gap: theme.spacing(2),
    alignItems: 'center',
    justifyItems: 'center',
    gridTemplateAreas: `
            "${rowGridArea.remove} ${rowGridArea.inputs} ${rowGridArea.add}"
            "_ ${rowGridArea.error} ${rowGridArea.error}"
        `,

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'auto 40px',
        gap: theme.spacing(1),
        gridTemplateAreas: `
            "${rowGridArea.inputs} ${rowGridArea.remove}"
            "${rowGridArea.error} ${rowGridArea.error}"
            "${rowGridArea.add} ${rowGridArea.add}"
        `,
    }
}))
