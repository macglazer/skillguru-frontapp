import { BinIcon } from "@icons/BinIcon";
import React from "react";
import styles from './styles.module.scss'
import { Typography } from "@mui/material";
import Button, {ButtonVariant} from "../../../../../components/Button/Button";

export const MenteeEditFooter = () => {
    return (
        <div className={styles.Footer}>
        <Button
            classes={styles.Btn}
            variant={ButtonVariant.DangerText}
        >
            <BinIcon />
            <Typography variant='buttonMd'>Usuń swoje konto</Typography>
        </Button>
        </div>
    )
}
