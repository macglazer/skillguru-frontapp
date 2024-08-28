import {
    Controller,
    Path,
    FieldValues, Control, ControllerProps, FormState
} from "react-hook-form"
import TextField, {TextFieldProps} from '@mui/material/TextField';
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Autocomplete, CircularProgress, Collapse} from "@mui/material";

import Typography from "@mui/material/Typography";
import {DropdownOption} from "@customTypes/dropdownOption";
import {StyledFeedbackWrapper, StyledInputWrapper} from "../FormInputSwitcher/FormInputSwitcher.styles";
import InputFeedback, {InputFeedbackProps} from "../InputFeedback/InputFeedback";

interface Props<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    formState: FormState<T>;
    label?: string;
    customFeedback?: InputFeedbackProps[];
    inputProps?: TextFieldProps;
    controllerProps?: Omit<ControllerProps<T>, 'name' | 'control' | 'render'>;
    getOptions: (query: string, abortController: AbortController) => Promise<readonly DropdownOption[]>;
    defaultValue?: any;
}

const FormAutocompleteDynamic = <T extends FieldValues>({
                                                            control,
                                                            name,
                                                            customFeedback,
                                                            inputProps,
                                                            controllerProps,
                                                            label,
                                                            formState,
                                                            getOptions,
                                                            defaultValue
                                                        }: Props<T>) => {
    const [options, setOptions] = useState<readonly DropdownOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const updateOptions = useCallback(async (query: string) => {
        setIsLoading(true);
        const newAbortController = new AbortController();
        const newOptions = await getOptions(query, newAbortController);
        setOptions(newOptions);
        setIsLoading(false);
    }, [getOptions]);

    const feedback: InputFeedbackProps[] = useMemo(() => {
        if (customFeedback) return customFeedback;
        const error = formState.errors[name];
        if (!error) return [];
        return [{ message: error.message as string, severity: 'error' }];
    }, [formState, customFeedback, name]);


    useEffect(() => {
        if (defaultValue && defaultValue.length > 0) {
            setIsLoading(true);
            setOptions(defaultValue);
            setIsLoading(false);
        }
    }, [defaultValue]);

    return (
        <StyledInputWrapper>
            {label && <Typography variant='buttonMd' color='secondary' >{label}</Typography>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <Autocomplete
                        filterOptions={(x) => x}
                        multiple
                        options={options}
                        getOptionLabel={(option) => option.label}
                        noOptionsText='Brak wyników'
                        onInputChange={(_event, value) => {
                            updateOptions(value);
                        }}
                        loading={isLoading}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Zacznij pisać aby wyszukać"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                                {...inputProps}
                            />
                        )}
                        onChange={(_event, values) => field.onChange(values)}
                        value={field.value}
                    />
                )}
                {...controllerProps}
            />
            <Collapse in={feedback && !!feedback.length}>
                <StyledFeedbackWrapper>
                    {feedback && feedback.map(({ message, severity }, index) => (
                        <InputFeedback key={`${message}_${index}`} message={message} severity={severity} />
                    ))}
                </StyledFeedbackWrapper>
            </Collapse>
        </StyledInputWrapper>
    );
}


export default FormAutocompleteDynamic;