import React, {FC, memo} from "react";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {InputAdornment} from "@mui/material";
import styles from "../WeekTime/WeekTime.module.scss";
import {TextFieldProps} from "@mui/material/TextField";
import {Control, Controller, get, UseFormClearErrors} from "react-hook-form";
import {areIntervalsOverlapping, differenceInMinutes, isAfter} from "date-fns";
import {ScheduleFormInputT} from "../../_types/ScheduleFormInputT";
import {ScheduleDateFieldT} from "../../_types/ScheduleDateField";

const slotsOverlapping = (rowValues: ScheduleDateFieldT[]): boolean => {
    return rowValues.some((slot, index) => (
        rowValues.slice(index + 1).some((slotToCompare) => (
            areIntervalsOverlapping(
                {start: slot.dateFrom, end: slot.dateTo},
                {start: slotToCompare.dateFrom, end: slotToCompare.dateTo}
            )
        ))
    ));
};

const slotShorterThanMeetingTime = (value: ScheduleDateFieldT, meetingLength: number): boolean => {
    if (isAfter(value.dateFrom, value.dateTo)) return false;
    return meetingLength - 1 > differenceInMinutes(value.dateTo, value.dateFrom);
};


type ClearErrorsIfExistArgs = {
    base: string,
    clearErrors: UseFormClearErrors<any>,
    formValues: ScheduleFormInputT
}

const clearErrorsIfExist = ({base, clearErrors, formValues}: ClearErrorsIfExistArgs) => {
    const errorsToClear = [];

    if (get(formValues, `${base}.dateTo`)) errorsToClear.push(`${base}.dateTo`)
    if (get(formValues, `${base}.dateFrom`)) errorsToClear.push(`${base}.dateFrom`)

    if (errorsToClear?.length) clearErrors(errorsToClear);
}

type CustomValidationArgs = {
    formValues: ScheduleFormInputT,
    baseName: string,
    idx: number,
    clearErrors: UseFormClearErrors<any>
}

const customValidation = ({formValues, idx, baseName, clearErrors}: CustomValidationArgs): true | string => {
        // omit validation on inactive days
        if (!get(formValues, `${baseName}.isActivated`)) return true;

        // variables
        const meetingLength = formValues.meetingLength;
        const rowValues = get(formValues, `${baseName}.slots`)
        const slotValues = rowValues[idx];

        clearErrorsIfExist({base: `${baseName}.slots.${idx}`, clearErrors, formValues});

        // validation
        if (rowValues.length > 1 && slotsOverlapping(rowValues)) return 'Przedziały czasowe pokrywają się';
        if (slotShorterThanMeetingTime(slotValues, meetingLength)) return 'Przedział czasowy nie może być krótszy niż czas trwania spotkania';

        return true
}

type Props = {
    label: string;
    inputProps?: TextFieldProps['InputProps'];
    isRowActivated: boolean;
    nameSuffix: string;
    formControl: Control<any>;
    baseName: string;
    idx: number;
    formClearErrors: UseFormClearErrors<any>;
}

const ScheduleTimePicker: FC<Props> = ({
                                           inputProps,
                                           label,
                                           isRowActivated,
                                           nameSuffix,
                                           formControl,
                                           formClearErrors,
                                           idx,
                                           baseName,
                                       }) => {


    return (
        <Controller
            render={({field}) => (
                <TimePicker
                    slotProps={{
                        textField: {
                            InputProps: {
                                startAdornment: <InputAdornment position="start">{label}</InputAdornment>,
                                classes: {input: styles.customTimePickerInput},
                                ...inputProps,
                            },
                        },
                    }}
                    autoFocus
                    disabled={!isRowActivated}
                    {...field}
                />
            )}
            name={`${baseName}.slots.${idx}.${nameSuffix}`}
            control={formControl}
            rules={{
                required: 'Pole wymagane',
                validate: async (_, formValues) => {
                    return customValidation({
                        formValues,
                        baseName,
                        idx,
                        clearErrors: formClearErrors
                    })

                },
            }}
        />
    )
}

export default memo(ScheduleTimePicker);