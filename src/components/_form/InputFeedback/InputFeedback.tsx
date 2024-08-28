import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Typography from "@mui/material/Typography";
import React from "react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import exhaustiveGuard from "../../../helpers/exhaustiveGuard";
import {StyledFeedback} from "./InputFeedback.styles";

export type InputFeedbackProps = {
    message: string;
    severity: 'error' | 'success';
}

const resolveIcon = (severity: InputFeedbackProps['severity']) => {
    switch (severity) {
        case 'error':
            return <CancelOutlinedIcon fontSize='large' color='error'/>
        case 'success':
            return <CheckCircleOutlinedIcon fontSize='large' color='success'/>
        default:
            exhaustiveGuard(severity)
    }
}

const resolveColor = (severity: InputFeedbackProps['severity']) => {
    switch (severity) {
        case 'error':
            return 'error.main'
        case 'success':
            return 'success.main'
        default:
            exhaustiveGuard(severity)
    }
}


const InputFeedback: React.FC<InputFeedbackProps> = ({message, severity}) => (
    <StyledFeedback>
        {resolveIcon(severity)}
        <Typography color={resolveColor(severity)} variant='body2'>
            {message}
        </Typography>
    </StyledFeedback>
);

export default InputFeedback;