import React from "react";
import styles from './Switcher.module.scss'
import clx from 'classnames'
import { CheckboxProps } from "@mui/material";

type Props = CheckboxProps & {
    checked?: boolean
    disabled?: boolean
    name?: string 
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const Switcher = ({ name, disabled, value, checked, onChange }: Props) => {
    return (
        <div className={clx(styles.switcher, {
            [styles.disabled]: disabled,
            [styles.checked]: checked,
        })}>
            <input
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    )
}
