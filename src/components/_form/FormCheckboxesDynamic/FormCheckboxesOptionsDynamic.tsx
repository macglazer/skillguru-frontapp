import {
  Controller,
  Path,
  FieldValues,
  Control,
  ControllerProps,
  FormState,
} from "react-hook-form";
import  { TextFieldProps } from "@mui/material/TextField";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Collapse } from "@mui/material";

import Typography from "@mui/material/Typography";

import { DropdownOption } from "@customTypes/dropdownOption";
import styles from "../styles.module.scss";
import {StyledFeedbackWrapper, StyledInputWrapper} from "../FormInputCheckbox/FormInputCheckbox.styles";
import InputFeedback, {InputFeedbackProps} from "../InputFeedback/InputFeedback";
import Checkbox, {CheckboxValueCb} from "../../Checkbox/Checkbox";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  formState: FormState<T>;
  label?: string;
  customFeedback?: InputFeedbackProps[];
  inputProps?: TextFieldProps;
  controllerProps?: Omit<ControllerProps<T>, "name" | "control" | "render">;
  getOptions: (
    query: string,
    abortController: AbortController
  ) => Promise<readonly DropdownOption[]>;
}

const FormCheckboxesOptionsDynamic = <T extends FieldValues>({
  control,
  name,
  customFeedback,
  inputProps,
  controllerProps,
  label,
  formState,
  getOptions,
}: Props<T>) => {
  const [options, setOptions] = useState<readonly DropdownOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortController = useMemo(() => new AbortController(), []);

  const updateOptions = useCallback(
    async (query: string) => {
      setIsLoading(true);
      // TODO test API call cancelations
      abortController.abort();
      const newOptions = await getOptions(query, abortController);
      setOptions(newOptions);
      setIsLoading(false);
    },
    [abortController, getOptions]
  );

  useEffect(() => {
    updateOptions("");
  }, [updateOptions]);

  const feedback: InputFeedbackProps[] = useMemo(() => {
    if (customFeedback) return customFeedback;
    const error = formState.errors[name];
    if (!error) return [];
    return [{ message: error.message as string, severity: "error" }];
  }, [formState, customFeedback, name]);

  return (
    <StyledInputWrapper>
      {label && <Typography variant="buttonMd" color='secondary'>{label}</Typography>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <div className={styles.Checkboxes}>
              {options.map((opt) => {
                const fieldValues = field.value.map(
                  (f: DropdownOption) => f?.label
                );

                return (
                  <Checkbox
                    key={opt.value}
                    {...field}
                    value={!!fieldValues.includes(opt.label)}
                    label={opt.label}
                    id={String(opt.value)}
                    fontVariant='caption'
                    colorVariant='base-80'
                    valueChangeHandler={(
                      name: string,
                      valueCh: CheckboxValueCb
                    ) => {
                      const checked = valueCh.value;
                      const value = opt.value;
                      const newValues = field.value.filter(
                        (v: string) => v !== value
                      );
                      if (checked) {
                        field.onChange([...newValues, opt]);
                      } else {
                        field.onChange(
                          newValues.filter(
                            (o: DropdownOption) => o.label !== opt.label
                          )
                        );
                      }
                    }}
                    // type="checkbox"
                    // {...field}
                    // {...inputProps}
                  />
                );
              })}
            </div>
          );
        }}
        {...controllerProps}
      />
      <Collapse in={feedback && !!feedback.length}>
        <StyledFeedbackWrapper>
          {feedback &&
            feedback.map(({ message, severity }, index) => {
              return (
                <InputFeedback
                  key={`${message}_${index}`}
                  message={message}
                  severity={severity}
                />
              );
            })}
        </StyledFeedbackWrapper>
      </Collapse>
    </StyledInputWrapper>
  );
};

export default FormCheckboxesOptionsDynamic;
