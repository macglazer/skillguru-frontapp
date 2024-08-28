import {
    Controller,
    Path,
    FieldValues, Control, ControllerProps, FormState
} from "react-hook-form"
import React, {useMemo} from "react";
import {Collapse} from "@mui/material";
import Typography from "@mui/material/Typography";
import {DatePickerProps} from "@mui/x-date-pickers";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import InputFeedback, {InputFeedbackProps} from "../InputFeedback/InputFeedback";
import {StyledFeedbackWrapper, StyledInputWrapper} from "../_common/FormInput.styles";

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    formState: FormState<T>;
    label?: string;
    customFeedback?: InputFeedbackProps[];
    inputProps?: DatePickerProps<any>;
    controllerProps?: Omit<ControllerProps<T>, 'name' | 'control' | 'render'>;
    hideError?: boolean
}

const FormDatePicker = <T extends FieldValues>({
                                                   control,
                                                   name,
                                                   customFeedback,
                                                   inputProps,
                                                   controllerProps,
                                                   label,
                                                   formState,
                                                   hideError
                                               }: Props<T>) => {

    const feedback: InputFeedbackProps[] = useMemo(() => {
        if (customFeedback) return customFeedback;
        const error = formState.errors[name]
        if (!error) return [];
        return [{message: error.message as string, severity: 'error'}];
    }, [formState, customFeedback, name]);

    return (
        <StyledInputWrapper>
            {label && <Typography variant='body2'>{label}</Typography>}
            <Controller
                name={name}
                control={control}
                render={({field}) => (
                    <DatePicker
                        {...field}
                        {...inputProps}
                    />
                )}
                {...controllerProps}
            />
            {!hideError && (
                <Collapse in={feedback && !!feedback.length}>
                    <StyledFeedbackWrapper>
                        {feedback && feedback.map(({message, severity}, index) => {
                            return <InputFeedback key={`${message}_${index}`} message={message} severity={severity}/>
                        })}
                    </StyledFeedbackWrapper>
                </Collapse>
            )}
        </StyledInputWrapper>
    )
}

export default FormDatePicker;