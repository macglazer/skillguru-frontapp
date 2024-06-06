import React from "react";
import {UserEditSection} from "@newComponents/_grouped";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import {useForm} from "react-hook-form";
import styles from "./styles.module.scss";
import FormInputFile from "@newComponents/_form/FormUploadFile/FormUploadFile";
import updateUserPersonalData from "../../../../../services/mentor/settingMentor.service";
import {useParams} from "react-router-dom";
import {MentorData} from "../../MentorProfileEditPage";


export type MentorEditPersonalDataFormInput = {
    firstName: string;
    surname: string;
    avatarUrl: File[];
    coverUrl: File[];
};

interface FormData {
    firstName: HTMLInputElement;
    surname: HTMLInputElement;
    avatarUrl: HTMLInputElement;
    coverUrl: HTMLInputElement;
}

type MentorPersonalData = {
    firstName: string;
    surname: string;
    avatarUrl: File[];
    coverUrl: File[];
};

type Props = {
    mentorData: MentorData;
};


export const MentorEditSectionPersonalData = ({ mentorData }: Props) => {
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
        // controllerProps: {rules: {required: "Imię jest wymagane"}},
        controllerProps: {}
    };

    const avatarValue = watch('avatarUrl')
    const coverValue = watch('coverUrl')
    const {id: userID} = useParams();

    const onSubmit = async (data: MentorEditPersonalDataFormInput) => {
        try {
            const mentorPersonalData: MentorPersonalData = {
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
            key={Math.random()}
            title="Dane osobowe"
            subtitle="Zaktualizuj swoje zdjęcie oraz dane osobowe."
            onClose={() => {
                console.log("onClose");
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className={styles.Inputs}>
                <div className={styles.InputsCols2}>
                    <FormInputText<MentorEditPersonalDataFormInput>
                        {...inputProps}
                        label="Imię"
                        inputProps={{ placeholder: mentorData?.firstName || '' }}
                        name="firstName"
                    />
                    <FormInputText<MentorEditPersonalDataFormInput>
                        {...inputProps}
                        label="Nazwisko"
                        inputProps={{ placeholder: mentorData?.lastName || '' }}
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
