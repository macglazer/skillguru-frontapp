import React from 'react';
import {AboutFormInput} from "@customTypes/registerFlow";
import {SubmitHandler, useForm} from "react-hook-form";
import useRegisterMentorContext from "../../../context/RegisterMentorContext";



import getAvailableLanguage from "@services/language/getAvailableLanguage.service";
import StepContentWrapper from "../StepContentWrapper/StepContentWrapper";
import FormInputText from "../../_form/FormInputText/FormInputText";
import FormInputSelect from "../../_form/FormInputSelect/FormInputSelect";

const formId = 'AboutFormInput'

const detectLanguage = () => {
    if (!navigator) return 'pl';
    const language = navigator.language;
    return language.split('-')[0];
}

const RegisterStep2 = () => {
    const {registerMentorDispatch, registerMentorState} = useRegisterMentorContext();

    const {control, formState, handleSubmit} = useForm<AboutFormInput>({
        defaultValues: {
            profession: registerMentorState.formData.profession || '',
            company: registerMentorState.formData.company || '',
            timezone: registerMentorState.formData.timezone || new Date().getTimezoneOffset(),
            language: registerMentorState.formData.language || detectLanguage()
        },
    });

    const goToNextStep: SubmitHandler<AboutFormInput> = (formData) => {
        registerMentorDispatch({
            type: 'COMMIT_ABOUT_INFO',
            payload: formData,
        })
    };

    return (
        <StepContentWrapper
            title="Już prawie gotowe!"
            subtitle='A teraz podaj nam o sobie trochę informacji, abyśmy mogli lepiej Ciebie poznać.'
            step={{current: 1, count: 4}}
            ctaProps={{
                type: 'submit',
                form: formId,
                disabled: !formState.isValid && formState.isSubmitted,
            }}
        >
            <form id={formId} onSubmit={handleSubmit(goToNextStep)}>
                <FormInputText<AboutFormInput>
                    label="Zawód"
                    name='profession'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: "UX/UI Designer"}}
                    controllerProps={{ rules: { required: 'Zawód jest wymagany' }}}
                />
                <FormInputText<AboutFormInput>
                    label="Firma"
                    name='company'
                    control={control}
                    formState={formState}
                    inputProps={{placeholder: "Google"}}
                    controllerProps={{ rules: { required: 'Frma jest wymagana' }}}
                />
                {/*<FormInputSelect<AboutFormInput>*/}
                {/*    label='Strefa czasowa'*/}
                {/*    name='timezone'*/}
                {/*    control={control}*/}
                {/*    formState={formState}*/}
                {/*    options={timezonesSelectOptions}*/}
                {/*    controllerProps={{ rules: { required: 'Strefa czasowa jest wymagana' }}}*/}
                {/*/>*/}
                <FormInputSelect<AboutFormInput>
                    label='Język prowadzenia zajęć'
                    name='language'
                    control={control}
                    formState={formState}
                    getOptions={getAvailableLanguage}
                    controllerProps={{ rules: { required: 'Język jest wymagany' }}}
                />
            </form>
        </StepContentWrapper>
    )
}

export default RegisterStep2;