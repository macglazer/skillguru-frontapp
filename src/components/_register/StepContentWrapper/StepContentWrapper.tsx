import React from "react";
import {Button, ButtonProps} from "@mui/material";
import Typography from "@mui/material/Typography";

import classNames from "classnames";
import {StyledCard, StyledStepper} from "./StepContentWrapper.styles";

type Props = {
    children: React.ReactNode,
    title: string,
    ctaProps: ButtonProps,
    ctaLabel?: string | React.ReactNode
    subtitle?: string,
    step?: { current: number, count: number },
    additionalActionComponent?: React.ReactNode
}

const StepContentWrapper: React.FC<Props> = ({
     children,
     additionalActionComponent,
     ctaProps,
     ctaLabel = 'Przejdz do następnego kroku',
     step,
     subtitle,
     title
 }) => {
    return <StyledCard variant='outlined'>
        {step && <StyledStepper>
            {Array.from(Array(step.count).keys()).map((key) => <span className={classNames(key < step.current && 'active')} key={key} />)}
        </StyledStepper>}
        <Typography variant='h2' textAlign='center'>{title}</Typography>
        {subtitle && <Typography variant='body2' textAlign='center'>{subtitle}</Typography>}
        {children}
        <Button variant='contained' {...ctaProps}>{ctaLabel}</Button>
        {additionalActionComponent}
    </StyledCard>
}

export default StepContentWrapper;