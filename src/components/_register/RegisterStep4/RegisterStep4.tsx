import React from 'react';

import {PortfolioFormInput} from "@customTypes/registerFlow";
import {SubmitHandler, useForm} from "react-hook-form";
import useRegisterMentorContext from "../../../context/RegisterMentorContext";
import registerMentorService from "../../../services/mentor/registerMentor.service";
import StepContentWrapper from "../StepContentWrapper/StepContentWrapper";
import FormInputText from "../../_form/FormInputText/FormInputText";

const formId = 'PortfolioFormInput'

const RegisterStep4 = () => {
    const {registerMentorDispatch, registerMentorState} = useRegisterMentorContext();

    const {control, formState, handleSubmit} = useForm<PortfolioFormInput>({
        defaultValues: {
            personalWebsite: registerMentorState.formData.personalWebsite || '',
            linkedin: registerMentorState.formData.linkedin || '',
            twitter: registerMentorState.formData.twitter || '',
            github: registerMentorState.formData.github || '',
            dribble: registerMentorState.formData.dribble || '',
            behance: registerMentorState.formData.behance || '',
        },
    });

    const createUserAndGoToNextStep: SubmitHandler<PortfolioFormInput> = async (formData) => {
        const {success, error, data} = await registerMentorService({...registerMentorState.formData, ...formData})

        if (!success) console.error(error)
        if (data) {
            registerMentorDispatch({
                type: 'SET_USER_ID',
                payload: data,
            })
            registerMentorDispatch({
                type: 'COMMIT_PORTFOLIO_INFO',
                payload: formData,
            })
        }

    };

    return (
        <StepContentWrapper
            title="Już prawie gotowe!"
            subtitle='A teraz podaj nam o sobie trochę informacji, abyśmy mogli lepiej Ciebie poznać.'
            step={{current: 3, count: 4}}
            ctaProps={{
                type: 'submit',
                form: formId,
                disabled: !formState.isValid && formState.isSubmitted,
            }}
        >
            <form id={formId} onSubmit={handleSubmit(createUserAndGoToNextStep)}>
                <FormInputText<PortfolioFormInput>
                    label='Twoja strona'
                    name='personalWebsite'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: 'https://www.twojastrona.com'}}
                />
                <FormInputText<PortfolioFormInput>
                    label='Linkedin URL'
                    name='linkedin'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: 'https://www.linkedin.com/in/twojprofil'}}
                />
                <FormInputText<PortfolioFormInput>
                    label='Twitter URL'
                    name='twitter'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: 'https://www.twitter.com/twojprofil'}}
                />
                <FormInputText<PortfolioFormInput>
                    label='Github URL'
                    name='github'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: 'https://www.github.com/twojprofil'}}
                />
                <FormInputText<PortfolioFormInput>
                    label='Dribble URl'
                    name='dribble'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: 'https://www.dribble.com/twojprofil'}}

                />
                <FormInputText<PortfolioFormInput>
                    label='Behance URL'
                    name='behance'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: 'https://www.behance.com/twojprofil'}}
                />
            </form>
        </StepContentWrapper>
    )
}

export default RegisterStep4;