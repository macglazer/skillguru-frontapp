import React, { ChangeEventHandler, Ref } from "react";
import classNames from "classnames";
import { Path } from "react-hook-form";

import { Text } from "src/components/typography";

import styles from "./InputField.module.scss";

export interface IFormValues {
  email: string;
  message: string;
}

export type InputFieldTypes = {
  id: Path<IFormValues>;
  name: Path<IFormValues>;
  label: string;
  type?: HTMLInputElement["type"];
  onChange: ChangeEventHandler;
  inputRef: Ref<HTMLInputElement>;
  error: string | undefined;
  className?: string;
};

export const InputField = ({
  id,
  name,
  label,
  type = "text",
  onChange,
  inputRef,
  error,
  className,
}: InputFieldTypes) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        ref={inputRef}
        className={classNames(styles.input, className)}
      />
      {error ? <Text classes={styles.error}>{error}</Text> : null}
    </div>
  );
};
