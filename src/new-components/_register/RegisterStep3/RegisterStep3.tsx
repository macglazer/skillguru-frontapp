import React, {useMemo} from 'react';
import StepContentWrapper from "@newComponents/_register/StepContentWrapper/StepContentWrapper";
import {ProfileFormInput} from "@customTypes/registerFlow";
import {SubmitHandler, useForm} from "react-hook-form";
import useRegisterMentorContext from "../../../context/RegisterMentorContext";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import Typography from "@mui/material/Typography";
import FormAutocompleteDynamic from "@newComponents/_form/FormAutocompleteDynamic/FormAutocompleteDynamic";
import Box from "@mui/material/Box";
import ProfilePictureEditor from "@newComponents/ProfilePictureEditor/ProfilePictureEditor";
import getAvailableSkillsService from "../../../services/skills/getAvailableSkills.service";

const formId = 'ProfileFormInput'

const maxBioCharacters = 500;

const RegisterStep3 = () => {
    const {registerMentorDispatch, registerMentorState} = useRegisterMentorContext();

    const {control, formState, handleSubmit, watch, resetField} = useForm<ProfileFormInput>({
        defaultValues: {
            profilePhoto: registerMentorState.formData.profilePhoto || null,
            bio: registerMentorState.formData.bio || '',
            skills: registerMentorState.formData.skills || [],
        },
    });

    const goToNextStep: SubmitHandler<ProfileFormInput> = (formData) => {
        registerMentorDispatch({
            type: 'COMMIT_PROFILE_INFO',
            payload: formData,
        })
    };

    const profilePhoto = watch('profilePhoto');
    const imageFile = useMemo(() => {
        if(profilePhoto) return profilePhoto[0];
        return null;
    }, [profilePhoto]);
    const onRemoveProfilePhoto = () => resetField('profilePhoto')

    const bioValue = watch('bio');
    const remainingCharacters = useMemo(() => {
        const count = maxBioCharacters - bioValue.length;

        return count > 0 ? `Pozostało ${count} znaków` : `Przekroczyłeś limit znaków o ${-count}`;
    }, [bioValue])


    return (
        <StepContentWrapper
            title="Już prawie gotowe!"
            subtitle='A teraz podaj nam o sobie trochę informacji, abyśmy mogli lepiej Ciebie poznać.'
            step={{current: 2, count: 4}}
            ctaProps={{
                type: 'submit',
                form: formId,
                disabled: !formState.isValid && formState.isSubmitted,
            }}
        >
            <form id={formId} onSubmit={handleSubmit(goToNextStep)}>
                <ProfilePictureEditor<ProfileFormInput>
                    control={control}
                    name='profilePhoto'
                    formState={formState}
                    imageFile={imageFile}
                    onRemove={onRemoveProfilePhoto}
                    controllerProps={{
                        rules: {
                            required: 'Zdjęcie profilowe jest wymagane',
                        }
                    }}
                />
                <FormInputText<ProfileFormInput>
                    inputProps={{multiline: true, rows: 4}}
                    name='bio'
                    control={control}
                    formState={formState}
                    label='Bio'
                    controllerProps={{
                        rules: {
                            required: 'To pole jest wymagane',
                            maxLength: {
                                value: maxBioCharacters,
                                message: `Maksymalna liczba znaków to ${maxBioCharacters}`
                            }
                        }
                    }}
                />
                <Typography variant='caption' color='base.60'>{remainingCharacters}</Typography>
                <Box sx={{mt: 2}}>
                    <FormAutocompleteDynamic<ProfileFormInput>
                        control={control}
                        formState={formState}
                        name='skills'
                        label='Umiejętności'
                        controllerProps={{ rules: {required: 'Dodaj przynajmniej jedną umiejętność'}}}
                        getOptions={getAvailableSkillsService}
                    />
                </Box>
            </form>
        </StepContentWrapper>
    )
}

export default RegisterStep3;