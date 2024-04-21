import {
    Controller,
    Path,
    FieldValues, Control, ControllerProps, FormState
} from "react-hook-form"
import React, {useMemo} from "react";
import {Checkbox, CheckboxProps, Collapse, FormControlLabel} from "@mui/material";
import {
    StyledFeedbackWrapper, StyledInputWrapper,
} from "@newComponents/_form/FormInputCheckbox/FormInputCheckbox.styles";
import InputFeedback, {InputFeedbackProps} from "@newComponents/_form/InputFeedback/InputFeedback";
import Typography from "@mui/material/Typography";

interface Props<T extends FieldValues> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    formState: FormState<T>;
    inputProps?: Omit<CheckboxProps, 'checked' | 'onChange'>;
    controllerProps?: Omit<ControllerProps<T>, 'name' | 'control' | 'render'>;
}

const FormInputCheckbox = <T extends FieldValues>({
    control,
    name,
    inputProps,
    controllerProps,
    label,
    formState
}: Props<T>) => {

    const feedback: InputFeedbackProps[] = useMemo(() => {
        const error = formState.errors[name]
        if (!error) return [];
        return [{message: error.message as string, severity: 'error'}];
    }, [formState, name]);

    return (
        <StyledInputWrapper>
            <FormControlLabel
                label={<Typography variant='body2'>{label}</Typography>}
                control={
                    <Controller
                        name={name}
                        control={control}
                        render={({field}) => (
                            <Checkbox
                                {...field}
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                                {...inputProps}
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

export default FormInputCheckbox;