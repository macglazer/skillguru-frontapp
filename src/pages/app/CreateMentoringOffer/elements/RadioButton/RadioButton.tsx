import React, { ChangeEventHandler } from "react";
import clx from "classnames";
import styles from "./RadioButton.module.scss";

type RadioButtonProps = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  classes?: string;
};
export const RadioButton = ({
  id,
  name,
  label,
  checked,
  onChange,
  classes,
}: RadioButtonProps) => {
  return (
    <label
      htmlFor={id}
      className={clx(styles.radio, classes)}
      data-variant={checked ? "checked" : null}
    >
      <input
        type="radio"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
      ></input>

      {label}
    </label>
  );
};
