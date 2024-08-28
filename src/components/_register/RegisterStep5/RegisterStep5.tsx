import React, {FC, FocusEvent, KeyboardEventHandler, useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom'

import {VerificationFormInput} from "@customTypes/registerFlow";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import useRegisterMentorContext from "../../../context/RegisterMentorContext";
import Typography from "@mui/material/Typography";
import {Button, Collapse, TextField} from "@mui/material";
import verifyEmailAddressService, {
    VerificationResponse
} from "../../../services/verifyEmailAddress/verifyEmailAddress.service";

import useRegisterMenteeContext from "../../../context/RegisterMenteeContext";
import {buildAfterRegisterLin} from "src/pages/app/SearchMentors/utils";
import StepContentWrapper from "../StepContentWrapper/StepContentWrapper";
import {StyledFallbackWrapper, StyledInputsWrapper} from "./RegisterStep5.styles";
import InputFeedback from "../../_form/InputFeedback/InputFeedback";


type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const SendAgain = () => {
    const resend = () => {
    }

    return (
        <Typography textAlign='center' variant='body2'>Nie dostałeś kodu?{' '}
            <Button
                onClick={resend}
                component={Button}
                size='small'
                sx={{padding: '4px'}}
                variant='text'
                color='secondary'
            >
                Wyślij ponownie
            </Button>
        </Typography>
    );
}

const formId = 'VerificationFormInput'


const validateSingleInput = (event: InputEvent, actionOnValidInput: () => void): InputEvent => {
    // regex to allow only digits and empty string
    const isProperInput = /^(\d|)$/.test(event.target.value)
    if (!isProperInput) event.target.value = event.target.value.slice(-1);
    if (event.target.value) setTimeout(actionOnValidInput, 0);
    return event;
}


type Props = {
    isMentor: boolean,
}

const RegisterStep5: FC<Props> = ({isMentor}) => {
    const navigate = useNavigate()
    const {registerMentorDispatch, registerMentorState} = useRegisterMentorContext();
    const {registerMenteeState, registerMenteeDispatch} = useRegisterMenteeContext();

    const [userFeedback, setUserFeedback] = useState<string | null>(null);

    const {stateSource, stateDispatcher} = useMemo(() => {
        if (isMentor) {
            return {stateSource: registerMentorState, stateDispatcher: registerMentorDispatch}
        } else {
            return {stateSource: registerMenteeState, stateDispatcher: registerMenteeDispatch}
        }
    }, [isMentor, registerMentorState, registerMenteeState, registerMenteeDispatch, registerMentorDispatch])


    const [isLoading, setIsLoading] = useState(false)

    const {control, formState, handleSubmit, setFocus} = useForm<VerificationFormInput>({
        defaultValues: {
            num1: '',
            num2: '',
            num3: '',
            num4: '',
        },
        reValidateMode: 'onSubmit',
    });

    useEffect(() => {
        if (!formState.isValid && formState.isSubmitted) setUserFeedback('Podaj cały wymagany kod')
    }, [formState.isValid]);


    const verifyCode: SubmitHandler<VerificationFormInput> = async (formData) => {
        if (stateSource.userId) {
            setIsLoading(true);

            const verificationResponse: VerificationResponse = await verifyEmailAddressService(formData, stateSource.userId);

            if (verificationResponse.body.success) {
                stateDispatcher({type: 'FLUSH_STATE'});
                const linkAfterVerification = buildAfterRegisterLin();
                navigate(linkAfterVerification);
            } else {
                setUserFeedback(verificationResponse.body.message);
            }
            setIsLoading(false);
        }
    };

    const onBackspace = (inputToFocus: keyof VerificationFormInput): KeyboardEventHandler<HTMLDivElement> => (event) => {
        if(event.key === 'Backspace') setTimeout(() => setFocus(inputToFocus), 0);
    }

    const commonInputProps = {

                            onFocus: ({target}: FocusEvent<HTMLInputElement>) => target.select(),
                            disabled: isLoading,
    }

    return (
        <StepContentWrapper
            title="Zweryfikuj swój e-mail"
            subtitle='Wysłaliśmy na Twój e-mail kod weryfikacyjny. Wprowadź go poniżej.'
            ctaProps={{
                type: 'submit',
                form: formId,
                disabled: (!formState.isValid && formState.isSubmitted) || isLoading,
            }}
            ctaLabel='Weryfikuj e-mail'
            additionalActionComponent={<SendAgain/>}
        >
            <form id={formId} onSubmit={handleSubmit(verifyCode)}>
                <StyledInputsWrapper>
                    <Controller
                        name='num1'
                        control={control}
                        rules={{required: true}}
                        render={({field: {ref, ...field}}) => <TextField
                            {...field}
                            {...commonInputProps}
                            inputRef={ref}
                            onChange={(event) => {
                                setUserFeedback(null);
                                field.onChange(validateSingleInput(event, () => setFocus('num2')));
                            }}
                        />}
                    />
                    <Controller
                        name='num2'
                        control={control}
                        rules={{required: true}}
                        render={({field: {ref, ...field}}) => <TextField
                            {...field}
                            {...commonInputProps}
                            inputRef={ref}
                            onKeyDown={onBackspace('num1')}
                            onChange={(event) => {
                                setUserFeedback(null);
                                field.onChange(validateSingleInput(event, () => setFocus('num3')));
                            }}
                        />}
                    />
                    <Controller
                        name='num3'
                        control={control}
                        rules={{required: true}}
                        render={({field: {ref, ...field}}) => <TextField
                            {...field}
                            {...commonInputProps}
                            inputRef={ref}
                            onKeyDown={onBackspace('num2')}
                            onChange={(event) => {
                                setUserFeedback(null);
                                field.onChange(validateSingleInput(event, () => setFocus('num4')));
                            }}
                        />}
                    />
                    <Controller
                        name='num4'
                        control={control}
                        rules={{required: true}}
                        render={({field: {ref, ...field}}) => <TextField
                            {...field}
                            {...commonInputProps}
                            inputRef={ref}
                            onKeyDown={onBackspace('num3')}
                            onChange={(event) => {
                                setUserFeedback(null);
                                field.onChange(validateSingleInput(event, handleSubmit(verifyCode)));
                            }}
                        />}
                    />
                    <StyledFallbackWrapper>
                        <Collapse in={!!userFeedback}>
                            <InputFeedback message={userFeedback || ''} severity='error'/>
                        </Collapse>
                    </StyledFallbackWrapper>
                </StyledInputsWrapper>

            </form>
        </StepContentWrapper>
    )
}

export default RegisterStep5;