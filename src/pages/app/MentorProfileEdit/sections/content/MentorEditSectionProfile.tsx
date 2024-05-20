import React from "react";
import {UserEditSection} from "@newComponents/_grouped";
import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import {useForm} from "react-hook-form";
import styles from "./styles.module.scss";
import FormAutocompleteDynamic from "@newComponents/_form/FormAutocompleteDynamic/FormAutocompleteDynamic";
import FormInputSelect from "@newComponents/_form/FormInputSelect/FormInputSelect";
import getAvailableSkillsService from "src/services/skills/getAvailableSkills.service";
import FormCheckboxesDynamic from "@newComponents/_form/FormCheckboxesDynamic/FormCheckboxesDynamic";
import getAvailableTagsService from "src/services/tags/getAvailableTags.service";
import getAvailableCategoriesService from "src/services/categories/getAvailableCategories.service";
import getAvailableTopicsService from "src/services/topics/getAvailableTopics.service";
import {updateUserProfile} from "../../../../../services/mentor/settingMentor.service";


export type MentorEditProfileFormInput = {
    heading: string;
    profession: string;
    company: string;
    biography: string;
    skills: string[];
    services: string[];
    timezone: string;
    language: string;
    categories: [];
    topics: [];
};

export const MentorEditSectionProfile = () => {
    const {control, formState, handleSubmit, watch} =
        useForm<MentorEditProfileFormInput>({
            defaultValues: {
                heading: '',
                profession: '',
                company: '',
                biography: '',
                skills: [],
                services: [],
                timezone: '',
                language: '',
                categories: [],
                topics: [],
            },
        });

    const inputProps = {
        formState: formState,
        control: control,
        controllerProps: {}
    };

    const onSubmit = async (data: MentorEditProfileFormInput) => {
        try {
            const mentorEditSection: MentorEditProfileFormInput = {
                heading: data.heading,
                profession: data.profession,
                company: data.company,
                biography: data.biography,
                skills: data.skills,
                services: data.services,
                timezone: data.timezone,
                language: data.language,
                categories: data.categories,
                topics: data.topics,
            };
            const response = await updateUserProfile(mentorEditSection);
            console.log('mentorEditSection onSubmit', mentorEditSection)
            window.location.reload();

        } catch (error) {
            console.error('Failed to update personal data', error);
        }

    };


    return (
        <UserEditSection
            title="Profil"
            subtitle="Zaktualizuj swoje portfolio oraz biografię."
            onClose={() => {
                console.log("onClose");
            }}

            onSubmit={handleSubmit(onSubmit)}

        >
            <div className={styles.Inputs}>
                <FormInputText<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Nagłówek Twojego profilu"
                    inputProps={{placeholder: "Wprowadź nagłowek Twojego profilu"}}
                    name="heading"
                />
                <FormInputText<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Zawód"
                    inputProps={{placeholder: "Wprowadź zawód"}}
                    name='profession'
                />
                <FormInputText<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Firma"
                    inputProps={{placeholder: "Wprowadź firmę"}}
                    name='company'
                />
                <FormInputText<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Bio"

                    inputProps={{placeholder: "Wprowadź biografię", multiline: true, minRows: 6,}}
                    name='biography'
                />
                <FormAutocompleteDynamic<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Umiejętności"
                    name='skills'
                    getOptions={getAvailableSkillsService}
                />
                <FormAutocompleteDynamic<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Tematy"
                    name='topics'
                    getOptions={getAvailableTopicsService}
                />
                <FormCheckboxesDynamic<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Kategorie"
                    name='categories'
                    getOptions={getAvailableCategoriesService}
                />
                <FormCheckboxesDynamic<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Usługi"
                    name='services'
                    getOptions={getAvailableTagsService}
                />
                <FormInputSelect<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Strefa czasowa"
                    name='timezone'
                    options={[
                        {value: '1', label: 'Warszawa, UTC+2'},
                        {value: '2', label: 'Warszawa, UTC+2'},
                        {value: '3', label: 'Warszawa, UTC+2'},
                    ]}
                />
                <FormInputSelect<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Język prowadzenia zajęć"
                    name='language'
                    options={[
                        {value: '1', label: 'polski'},
                        {value: '2', label: 'angielski'},
                        {value: '3', label: 'francuski'},
                    ]}
                />
            </div>
        </UserEditSection>
    );
};
