import React from "react";
import {useForm} from "react-hook-form";
import styles from "./styles.module.scss";
import updateUserPersonalData from "@services/mentor/settingMentor.service";
import {UserEditSection} from "../../../../../components/_grouped";
import FormInputText from "../../../../../components/_form/FormInputText/FormInputText";
import FormInputFile from "../../../../../components/_form/FormUploadFile/FormUploadFile";

export type MentorEditPersonalDataFormInput = {
    userID: number;
    firstName: string;
    surname: string;
    avatarUrl: File[];
    coverUrl: File[];
};

interface FormData {
    firstname: HTMLInputElement;
    surname: HTMLInputElement;
    avatarUrl: HTMLInputElement;
    coverUrl: HTMLInputElement;
}


type MenteePersonalData = {
    firstName: string;
    surname: string;
    avatarUrl: File[];
    coverUrl: File[];
};

export const MenteeEditSectionPersonalData = () => {
    const {control, formState, handleSubmit, watch} =
        useForm<MentorEditPersonalDataFormInput>({
            defaultValues: {
                firstName: "",
                surname: "",
                avatarUrl: [],
                coverUrl: [],
            },
        });

    const inputProps = {
        formState: formState,
        control: control,
        controllerProps: {}
    };

    const avatarValue = watch('avatarUrl')
    const coverValue = watch('coverUrl')


    const onSubmit = async (data: MentorEditPersonalDataFormInput) => {
        try {
            const mentorPersonalData: MenteePersonalData = {
                firstName: data.firstName,
                surname: data.surname,
                avatarUrl: avatarValue,
                coverUrl: coverValue,
            };
            const response = await updateUserPersonalData(mentorPersonalData);
            window.location.reload();

        } catch (error) {
            console.error('Failed to update personal data', error);
        }
    };

    return (
        <UserEditSection
            title="Dane osobowe"
            subtitle="Zaktualizuj swoje zdjęcie oraz dane osobowe."
            onClose={() => {
                console.log("onClose");
            }}
            onSubmit={handleSubmit(onSubmit)}>

            <div className={styles.Inputs}>
                <div className={styles.InputsCols2}>
                    <FormInputText<MentorEditPersonalDataFormInput>
                        {...inputProps}
                        label="Imię"
                        inputProps={{placeholder: "Wprowadź swoje Imię"}}
                        name="firstName"
                    />
                    <FormInputText<MentorEditPersonalDataFormInput>
                        {...inputProps}
                        label="Nazwisko"
                        inputProps={{placeholder: "Wprowadź swoje nazwisko"}}
                        name="surname"
                    />
                </div>
                <FormInputFile<MentorEditPersonalDataFormInput>
                    {...inputProps}
                    label="Zdjęcie profilowe"
                    name="avatarUrl"
                    withPreview
                />
                <FormInputFile<MentorEditPersonalDataFormInput>
                    {...inputProps}
                    label="Zdjęcie w tle"
                    name="coverUrl"
                    withPreview
                />
            </div>
        </UserEditSection>
    );
};
