// Libraries
import React, {ChangeEvent, InputHTMLAttributes} from "react";
import clx from "classnames";
// Helpers
import validation from "../../helpers/improovedValidation";
// Styles
import styles from "./Checkbox.module.scss";
import {CheckboxIcon} from "@icons/CheckboxIcon";

export type CheckboxValueCb = {
    value: boolean;
    errorMessage?: string;
    isValid: boolean;
};

export type CheckboxValueChangeHandler = (
    name: string,
    value: CheckboxValueCb
) => void;

interface CheckboxProps {
    id: string;
    name: string;
    label: React.ReactNode;
    type?: "checkbox" | "radio";
    required?: boolean;
    value: boolean;
    errorMessage?: string;
    isValid?: boolean;
    valueChangeHandler: CheckboxValueChangeHandler;
    classes?: string;
    slide?: boolean;
    fontVariant?: "button-sm" | "caption";
    colorVariant?: "base-80" | "primary";
    disabled?: boolean
}

const Checkbox = (props: CheckboxProps) => {
    const {
        id,
        name,
        label,
        type = "checkbox",
        required = false,
        value,
        errorMessage,
        valueChangeHandler,
        classes,
        slide,
        fontVariant = "",
        colorVariant = "",
        disabled,
    } = props;

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const errorMessage = validation(true, e.target.checked, name, required);
        valueChangeHandler(name, {
            value: e.target.checked,
            errorMessage,
            isValid: errorMessage === "",
        });
    };

    return (
        <label
            className={clx(styles.checkbox, classes, {
                [styles.slide]: slide,
                [styles.disabled]: disabled,
            })}
            data-is-error={!!errorMessage}
            data-is-radio={type === "radio"}
        >
            <input
                id={id}
                name={name}
                className={styles.checkboxField}
                type={type}
                onChange={changeHandler}
                checked={value}
                required={required}
                disabled={disabled}
            />
            <div
                className={clx(styles.checkboxLabel, {
                    [styles.checkboxLabelButtonSm]: fontVariant === "button-sm",
                    [styles.checkboxLabelCaption]: fontVariant === "caption",
                    [styles.checkboxLabelBase80]: colorVariant === "base-80",
                    [styles.checkboxLabelPrimary]: colorVariant === "primary",
                })}
            >
                {slide ? (
                    <span className={styles.slideField}/>
                ) : (
                    <CheckboxIcon checked={value} className={styles.icon}/>
                )}
                <span>
          {label}
                    {required && " *"}
        </span>
            </div>
        </label>
    );
};

export default Checkbox;
