import {Control, Controller, ControllerProps, FieldValues, FormState, Path} from "react-hook-form"
import React, {useMemo} from "react";
import {CheckboxProps, Collapse, FormControlLabel} from "@mui/material";


import Typography from "@mui/material/Typography";
import InputFeedback, {InputFeedbackProps} from "../InputFeedback/InputFeedback";
import {StyledFeedbackWrapper, StyledInputWrapper} from "./FormInputSwitcher.styles";
import {Switcher} from "../../_base/Switcher";


interface Props<T extends FieldValues> {
    className?: string;
    label: string;
    name: Path<T>;
    control: Control<T>;
    formState: FormState<T>;
    inputProps?: Omit<CheckboxProps, 'checked' | 'onChange'>;
    controllerProps?: Omit<ControllerProps<T>, 'name' | 'control' | 'render'>;
}

const FormInputSwitcher = <T extends FieldValues>({
    control,
    name,
    inputProps,
    controllerProps,
    label,
    formState,
    className,
}: Props<T>) => {

    const feedback: InputFeedbackProps[] = useMemo(() => {
        const error = formState.errors[name]
        if (!error) return [];
        return [{message: error.message as string, severity: 'error'}];
    }, [formState, name]);

    return (
        <StyledInputWrapper className={className}>
            <FormControlLabel
                label={
                    <Typography style={{ marginRight: '0' }} variant='body2'>{label}</Typography>
                }
                sx={{ display: 'flex', flexDirection: 'row-reverse', alignContent: 'center', justifyContent: 'space-between', gap: '20px',  }}
                control={
                    <Controller
                        name={name}
                        control={control}
                        render={({field}) => (
                            <Switcher
                                // {...field}
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                                // {...inputProps}
                                name={inputProps?.name || ''}
                            />
                        )}
                        {...controllerProps}
                    />
                }
            />
            <Collapse in={feedback && !!feedback.length}>
                <StyledFeedbackWrapper>
                    {feedback && feedback.map(({message, severity}, index) => {
                        return <InputFeedback key={`${message}_${index}`} message={message} severity={severity} />
                    })}
                </StyledFeedbackWrapper>
            </Collapse>
        </StyledInputWrapper>
    )
}

export default FormInputSwitcher;