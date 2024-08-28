import React, {FC, useEffect, useRef} from 'react';
import {ReactComponent as SkillGuruLogo} from '@icons/svg/logo_skillguru.svg';

import Typography from "@mui/material/Typography";
import {Theme, useMediaQuery} from "@mui/material";
import {
    StyledContainer,
    StyledIcon,
    StyledIconWrapper,
    StyledList,
    StyledNode
} from "./RegisterStepperNavigation.styles";
import Logo from '@icons/Logo';

export type NavigationContentT = {
    title: string;
    shorthand: string;
    subtitle: string;
    icon: React.ReactNode;
    id: number;
}

type Props = {
    navigationContent: NavigationContentT[];
    maxStep: number;
    currentStep: number;
    updateStep: (newStep: number) => void;
}

const RegisterStepperNavigation: FC<Props> = ({ navigationContent, maxStep, updateStep, currentStep }) => {
    const isMD = useMediaQuery((theme) => (theme as Theme).breakpoints.down('md'));

    const refsObject = useRef<Record<number, HTMLElement | null>>({});

    useEffect(() => {
        const elementToScroll = refsObject.current[currentStep];
        if (isMD && !!elementToScroll) elementToScroll.scrollIntoView({inline: "center", behavior: 'smooth'})
    }, [currentStep, isMD])

    return (
        <StyledContainer>
            <StyledIconWrapper>
                <Logo/>
            </StyledIconWrapper>
            <StyledList>
                {navigationContent.map(({id, subtitle, icon, title, shorthand}, index) => (
                    <StyledNode
                        clickable={index <= maxStep}
                        onClick={() => updateStep(index)}
                        ref={ref => refsObject.current[id] = ref} active={index === currentStep}
                        key={id}
                    >
                        <StyledIcon>{icon}</StyledIcon>
                        <Typography color='secondary.contrastText'
                                    variant={isMD ? 'buttonSm' : 'buttonLg'}>{isMD ? shorthand : title}</Typography>
                        {!isMD && <Typography color='secondary.contrastText' variant='caption'>{subtitle}</Typography>}
                    </StyledNode>
                ))}
            </StyledList>
        </StyledContainer>
    )
}

export default RegisterStepperNavigation;
