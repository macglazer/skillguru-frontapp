import React from "react";

import {useForm} from "react-hook-form";
import styles from "./styles.module.scss";

import getAvailableSkillsService from "src/services/skills/getAvailableSkills.service";
import getAvailableServices from "src/services/services/getAvailableServices";
import getAvailableCategoriesService from "src/services/categories/getAvailableCategories.service";
import getAvailableTopicsService from "src/services/topics/getAvailableTopics.service";
import {updateUserProfile} from "../../../../../services/mentor/settingMentor.service";
import getAvailableLanguage from "../../../../../services/language/getAvailableLanguage.service";
import {DropdownOption} from "@customTypes/dropdownOption";
import getAvailableTimezone from "@services/timezone/getAvailableTimezone.service";
import {MentorData} from "../../MentorProfileEditPage";
import {UserEditSection} from "../../../../../components/_grouped";
import FormInputText from "../../../../../components/_form/FormInputText/FormInputText";
import FormAutocompleteDynamic from "../../../../../components/_form/FormAutocompleteDynamic/FormAutocompleteDynamic";
import FormCheckboxesOptionsDynamic
    from "../../../../../components/_form/FormCheckboxesDynamic/FormCheckboxesOptionsDynamic";
import FormInputSelect from "../../../../../components/_form/FormInputSelect/FormInputSelect";


export type MentorEditProfileFormInput = {
    heading: string;
    profession: string;
    company: string;
    biography: string;
    skill: DropdownOption[];
    services: DropdownOption[];
    timezone: string;
    language: DropdownOption[];
    categories: DropdownOption[];
    mentorTopics: DropdownOption[];
};

type Props = {
    mentorData: MentorData;
};

export const MentorEditSectionProfile = ({mentorData}: Props) => {

    const {control, formState, handleSubmit, watch} =
        useForm<MentorEditProfileFormInput>({
            defaultValues: {
                heading: '',
                profession: '',
                company: '',
                biography: '',
                skill:mentorData?.skill || [],
                services: mentorData?.services || [],
                timezone: '',
                language: [],
                categories: mentorData?.mentorCategory || [],
                mentorTopics: mentorData?.mentorTopics || [],
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
                skill: data.skill,
                services: data.services,
                timezone: data.timezone,
                language: data.language,
                categories: data.categories,
                mentorTopics: data.mentorTopics

            };
            const response = await updateUserProfile(mentorEditSection);
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
            onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.Inputs}>
                <FormInputText<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Nagłówek Twojego profilu"
                    inputProps={{placeholder: mentorData?.intro || "Wprowadź nagłowek Twojego profilu"}}
                    name="heading"
                />
                <FormInputText<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Zawód"
                    inputProps={{placeholder: mentorData?.jobPosition || 'Wprowadź zawód'}}

                    name='profession'
                />
                <FormInputText<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Firma"
                    inputProps={{placeholder: mentorData?.company || "Wprowadź nazwę firmy gdzie pracujesz"}}
                    name='company'
                />
                <FormInputText<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Bio"
                    inputProps={{
                        placeholder: mentorData?.description || "Wprowadź biografię",
                        multiline: true,
                        minRows: 6,
                    }}
                    name='biography'
                />
                <FormAutocompleteDynamic<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Umiejętności"
                    name='skill'
                    defaultValue={mentorData?.skill || []}
                    getOptions={getAvailableSkillsService}
                />
                <FormAutocompleteDynamic<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Tematy"
                    name='mentorTopics'
                    defaultValue={mentorData?.mentorTopics || []}
                    getOptions={getAvailableTopicsService}
                />
                <FormCheckboxesOptionsDynamic<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Kategorie"
                    name='categories'
                    getOptions={getAvailableCategoriesService}
                />
                <FormCheckboxesOptionsDynamic<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Usługi"
                    name='services'
                    getOptions={getAvailableServices}
                />
                <FormInputSelect<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Strefa czasowa"
                    name='timezone'
                    getOptions={getAvailableTimezone}

                />
                <FormCheckboxesOptionsDynamic<MentorEditProfileFormInput>
                    {...inputProps}
                    label="Język mentoringu"
                    name='language'
                    getOptions={getAvailableLanguage}
                />
            </div>
        </UserEditSection>
    );
};