import {
  Controller,
  Path,
  FieldValues,
  Control,
  ControllerProps,
  FormState,
} from "react-hook-form";
import React, { useMemo } from "react";
import {
  Checkbox,
  CheckboxProps,
  Collapse,
  FormControlLabel,
} from "@mui/material";
import CheckBox from "src/components/Checkbox/Checkbox";
import Typography from "@mui/material/Typography";
import InputFeedback, {
  InputFeedbackProps,
} from "../InputFeedback/InputFeedback";
import {
  StyledFeedbackWrapper,
  StyledInputWrapper,
} from "./FormInputCheckbox.styles";
import { CheckboxIcon } from "src/assets/icons/CheckboxIcon";

interface Props<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  formState: FormState<T>;
  inputProps?: Omit<CheckboxProps, "checked" | "onChange">;
  controllerProps?: Omit<ControllerProps<T>, "name" | "control" | "render">;
}

const FormInputCheckbox = <T extends FieldValues>({
  control,
  name,
  inputProps,
  controllerProps,
  label,
  formState,
}: Props<T>) => {
  const feedback: InputFeedbackProps[] = useMemo(() => {
    const error = formState.errors[name];
    if (!error) return [];
    return [{ message: error.message as string, severity: "error" }];
  }, [formState, name]);

  return (
    <StyledInputWrapper>
      <FormControlLabel
        label={<Typography variant="caption">{label}</Typography>}
        control={
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                {...inputProps}
                icon={<CheckboxIcon />}
                checkedIcon={<CheckboxIcon checked />}
              />
            )}
            {...controllerProps}
          />
        }
      />
      {feedback ? (
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
      ) : null}
    </StyledInputWrapper>
  );
};

export default FormInputCheckbox;
