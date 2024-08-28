import React, { ChangeEventHandler, Ref } from "react";
import classNames from "classnames";
import { Path } from "react-hook-form";

import { Text } from "src/components/typography";

import styles from "./TextareaField.module.scss";

export interface IFormValues {
  message: string;
}

export type TextareaFieldTypes = {
  id: Path<IFormValues>;
  name: Path<IFormValues>;
  label: string;
  onChange: ChangeEventHandler;
  textareaRef: Ref<HTMLTextAreaElement>;
  error: string | undefined;
  className?: string;
  rows?: number;
};

export const TextareaField = ({
  id,
  name,
  label,
  onChange,
  textareaRef,
  error,
  className,
  rows = 3,
}: TextareaFieldTypes) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        onChange={onChange}
        ref={textareaRef}
        className={classNames(styles.textarea, className)}
        rows={rows}
      />
      {error ? <Text classes={styles.error}>{error}</Text> : null}
    </div>
  );
};
