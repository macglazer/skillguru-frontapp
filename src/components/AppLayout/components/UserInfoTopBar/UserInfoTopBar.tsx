import React from 'react'
import styles from './UserInfoTopBar.module.scss'
import {useUserMessages} from "../../../../reducers/userMessages/useUserMessages";
import clx from "classnames";
import Typography from "@mui/material/Typography";
import {UserMessageSeverity} from "../../../../reducers/userMessages/userMessagesReducer.types";
import exhaustiveGuard from "../../../../helpers/exhaustiveGuard";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import WarningIcon from '@mui/icons-material/WarningAmber';
import {useLayoutReducer} from "../../../../reducers/layout";

const resolveIcon = (severity: UserMessageSeverity) => {
    switch (severity) {
        case "error":
            return <CancelOutlinedIcon fontSize='large'/>;
        case "warning":
            return <WarningIcon fontSize='large'/>;
        case "info":
            return <CheckCircleOutlinedIcon fontSize='large'/>;
        default:
            return exhaustiveGuard(severity);
    }
}

const UserInfoTopBar = () => {
    const [userMessage] = useUserMessages();
    const {layoutState} = useLayoutReducer();

    if (!userMessage.currentMessage || !userMessage.currentMessage.message) return null;

    return (
        <div
            className={clx(
                styles.container,
                {
                    [styles.error]: userMessage.currentMessage.severity === "error",
                    [styles.warning]: userMessage.currentMessage.severity === "warning",
                    [styles.info]: userMessage.currentMessage.severity === "info",
                    [styles.isSidebarOpen]: layoutState.isSidebarOpen,
                }
            )}
        >
            <div className={styles.content}>
            {resolveIcon(userMessage.currentMessage.severity)}
            <Typography className={styles.text} variant='buttonMd'>
                {userMessage.currentMessage.message()}
            </Typography>
            </div>
        </div>
    )
};

export default UserInfoTopBar